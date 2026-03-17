import axios from "axios";

const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true
});

// 1️⃣ REQUEST INTERCEPTOR (attach access token)
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

async function test() {
       // call refresh endpoint
        const refreshResponse = await api.post("/api/auth/refresh");
        return refreshResponse;
}

// 2️⃣ RESPONSE INTERCEPTOR (handle expired token)
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;

      try {

        // call refresh endpoint
        const refreshResponse = await api.post("/api/auth/refresh");

        const newAccessToken = refreshResponse.data.accessToken;

        // store new token
        localStorage.setItem("token", newAccessToken);

        // update header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // retry original request
        return api(originalRequest);

      } catch (refreshError) {

        // refresh failed → logout user
        localStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;

