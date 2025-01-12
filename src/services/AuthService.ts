import axiosInstance from "./AxiosInstance.ts";
import SessionAccountService from "./SessionAccountService.ts";

const url = `${import.meta.env.VITE_API_URL}/api/auth`; // Replace with your API endpoint for logout

const AuthService = {
    /**
     * Logs out the user by sending a logout request to the API and clearing session data.
     */
    async logout(): Promise<void> {
        try {
            // Send logout request to the API
            await axiosInstance.post(`${url}/logout`);

            // Clear the session data using SessionAccountService
            SessionAccountService.clear();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    },
};

export default AuthService;
