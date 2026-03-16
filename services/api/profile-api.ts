import api from '@/lib/axios';
import type { User } from '@/types/user';

// Get the user profile from the backend
export const getProfile = async (): Promise<{ data: User }> => {
  const res = await api.get("/api/users/me");
  console.log("PROFILE USER = ", res?.data?.data);
  return res.data;
};

// Update the user profile
export const updateProfile = async (data: Partial<User>): Promise<{ data: User }> => {
  const res = await api.put("/api/users/me", data);
  return res.data;
};
