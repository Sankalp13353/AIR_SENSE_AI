import api from "./api";

export const predictAQI = async (data) => {
  const response = await api.post("/prediction/", data);
  return response.data;
};

export const getPredictionHistory = async () => {
  const response = await api.get("/prediction/history");
  return response.data;
};

export const getPredictionStats = async () => {
  const response = await api.get("/prediction/stats");
  return response.data;
};

export const deletePrediction = async (predictionId) => {
  const response = await api.delete(`/prediction/${predictionId}`);
  return response.data;
};

export const chatWithAI = async (data) => {
  const response = await api.post("/chat/", data);
  return response.data;
};