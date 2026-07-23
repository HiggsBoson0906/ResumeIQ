import api from "./api";

// Upload Resume
export const uploadResume = async (formData) => {
  const response = await api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get All Resumes
export const getResumes = async () => {
  const response = await api.get("/resume");
  return response.data;
};

// Get Resume by ID
export const getResumeById = async (id) => {
  const response = await api.get(`/resume/${id}`);
  return response.data;
};

// Delete Resume
export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};

// Analyze Resume
export const analyzeResume = async (formData) => {
  const response = await api.post("/resume/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get Resume History
export const getResumeHistory = async () => {
  const response = await api.get("/resume/history");
  return response.data;
};

// Get Analysis by ID
export const getAnalysisById = async (id) => {
  const response = await api.get(`/resume/analysis/${id}`);
  return response.data;
};

