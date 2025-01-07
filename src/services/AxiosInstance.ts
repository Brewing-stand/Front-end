import axios from 'axios';

// Create an Axios instance with common configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // Base URL for the API
    withCredentials: true,  // Ensures cookies are sent with the request
});

// Add response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login page on unauthorized error
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
