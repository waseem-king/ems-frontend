import api from "@/lib/axios";

export const signupUser = async (data: any) => {
  const res = await api.post("/api/users", data);
  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await api.post("/api/user", data);
  return res.data;
};
