import React, { useState, useEffect } from 'react';
import { getResumeHistory } from '../services/resumeService';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

const ResumeScoreTrend = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getResumeHistory();
        if (response.success && response.history) {
          const formattedData = response.history.map(item => {
            const date = new Date(item.createdAt);
            const month = date.toLocaleString('default', { month: 'short' });
            const day = date.getDate();
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return {
              ...item,
              formattedDate: `${month} ${day}, ${time}`, // e.g., "Jul 23, 10:30 AM"
              fullDate: `${date.toLocaleDateString()} at ${time}`,
              AverageScore: response.averageScore
            };
          });
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching resume history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: '32px', background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '20px' }}>Resume Score Trend</h2>
        <div style={{ height: '300px', width: '100%', background: '#f3f4f6', borderRadius: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      </div>
    );
  }

  if (data.length <= 1) {
    return (
      <div style={{ marginTop: '32px', background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Resume Score Trend</h2>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', textAlign: 'center', padding: '40px 0' }}>Analyze more resumes to see your score trend.</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '32px', background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '24px' }}>Resume Score Trend</h2>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="formattedDate" tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="score"
              name="Score"
              stroke="#15803d"
              strokeWidth={3}
              dot={{ r: 4, fill: '#15803d' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="AverageScore"
              name="Average Score"
              stroke="#86efac"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResumeScoreTrend;
