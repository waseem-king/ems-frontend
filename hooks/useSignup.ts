import { signupUser } from "@/services/api/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser
  })
}
