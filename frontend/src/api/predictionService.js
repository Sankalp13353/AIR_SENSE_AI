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