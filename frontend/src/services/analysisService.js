import api from "./api";

// Analyze Resume
export const analyzeResume = async (data) => {
  const response = await api.post("/analysis/analyze", data);
  return response.data;
};

// Get Analysis by ID
export const getAnalysisById = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

// Get All Analyses
export const getAnalyses = async () => {
  const response = await api.get("/analysis");
  return response.data;
};
