import api from "./client";

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};