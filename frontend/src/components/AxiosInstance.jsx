import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://creditdisputebackend-production.up.railway.app/api",
  withCredentials: true,
});

// ✅ Inject token into request headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Auto-refresh logic (keep as-is)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "Invalid or expired token"
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://creditdisputebackend-production.up.railway.app/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;
        const expiry = Date.now() + 15 * 60 * 1000;

        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenExpiry", expiry.toString());

        // 🛠️ Set token for retry
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
