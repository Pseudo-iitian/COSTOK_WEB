import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Axios Response Interceptor for Token Refresh
api.interceptors.response.use(
  (response) => response, // Pass successful responses
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and it's not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token
        const response = await axios.post("/auth/refresh-token", {
          refreshToken,
        });

        if (response.data.accessToken) {
          // Save the new access token
          localStorage.setItem("accessToken", response.data.accessToken);

          // Update the failed request with the new token and retry it
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle failed refresh (e.g., logout user)
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
