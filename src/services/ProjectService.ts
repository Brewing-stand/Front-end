import {Project} from "../models/Project.ts";
import axiosInstance from "./AxiosInstance.ts";
import {AxiosResponse} from "axios";

const url = `${import.meta.env.VITE_API_URL}/api/project`;

const ProjectService = {
    async getAll(): Promise<AxiosResponse<[]>> {
        return axiosInstance.get(url);
    },

    async get(id: string): Promise<AxiosResponse> {
        return axiosInstance.get(`${url}/${id}`);
    },

    async create(project: Project): Promise<AxiosResponse> {
        return axiosInstance.post(url, project);
    },

    async update(id: string, project: Project): Promise<AxiosResponse> {
        return axiosInstance.put(`${url}/${id}`, project);
    },

    async delete(id: string): Promise<AxiosResponse> {
        return axiosInstance.delete(`${url}/${id}`);
    }
};

export default ProjectService;
