import axiosInstance from "./AxiosInstance.ts";
import {AxiosResponse} from "axios";
import {User} from "../models/User.ts";
import AuthService from "./AuthService.ts";

let url = `${import.meta.env.VITE_API_URL}/user`; // Replace with your API endpoint for projects

url = "http://localhost:5001/api/user"

const ProjectService = {
    async get(): Promise<AxiosResponse> {
        return axiosInstance.get(url);
    },

    async update(user: User): Promise<AxiosResponse> {
        return axiosInstance.put(url, user);
    },

    async delete(): Promise<AxiosResponse> {
        // Perform the deletion request
        const response = await axiosInstance.delete(url);

        // Log the user out after deletion
        await AuthService.logout();

        return response; // Return the response from the deletion
    }
};

export default ProjectService;
