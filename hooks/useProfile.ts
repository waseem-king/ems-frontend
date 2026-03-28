import { getProfile } from "@/services/api/profile-api";
import { useQuery } from "@tanstack/react-query";
import type { User } from '@/types/user';

export const useProfile = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled,
  });
};
