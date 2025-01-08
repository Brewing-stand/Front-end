import axiosInstance from "./AxiosInstance.ts";
import {AxiosResponse} from "axios";
import {User} from "../models/User.ts";
import AuthService from "./AuthService.ts";
import SessionAccountService from "./SessionAccountService.ts";

let url = `${import.meta.env.VITE_API_URL}/user`;

const UserService = {
    async get(): Promise<AxiosResponse> {
        return axiosInstance.get(url);
    },

    async update(user: User): Promise<AxiosResponse> {
        try {
            const response = await axiosInstance.put(url, user); // Update user data on the server

            if (response.status === 200) {
                // After updating user data on the server, update the session data
                await SessionAccountService.update(); // This will update sessionStorage with the latest user data
            }

            return response;
        } catch (error) {
            console.error("Error updating user data:", error);
            throw error;
        }
    },

    async delete(): Promise<AxiosResponse> {
        // Perform the deletion request
        const response = await axiosInstance.delete(url);

        // Log the user out after deletion
        await AuthService.logout();

        return response; // Return the response from the deletion
    }
};

export default UserService;
