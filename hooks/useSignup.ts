import { loginUser, signupUser } from "@/services/api/auth-api";
import { useMutation } from "@tanstack/react-query";


// sign up
export const useSignup = () => {
  return useMutation({
    mutationFn: signupUser
  })
}

// login 
export const useLogin = () =>{
  return useMutation({
    mutationFn:loginUser
  })
}