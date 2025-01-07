import axios, {AxiosResponse} from 'axios';
import {Project} from "../models/Project.ts";

let url = `${import.meta.env.VITE_API_URL}/project`; // Replace with your API endpoint for projects

url = "http://localhost:5281/api/Project";

const projectService = {
    // Get all projects
    async getAll(): Promise<AxiosResponse<[]>> {
        return axios.get(url, {
            withCredentials: true, // Ensures the cookie is sent with the request
        });
    },

    // Get a specific project by ID
    async get(id: string): Promise<AxiosResponse> {
        return axios.get(`${url}/${id}`, {
            withCredentials: true, // Ensures the cookie is sent with the request
        });
    },

    // Create a new project
    async create(project: Project): Promise<AxiosResponse> {
        return axios.post(url, project, {
            withCredentials: true, // Ensures the cookie is sent with the request
        });
    },

    // Update an existing project by ID
    async update(id: string, project: Project): Promise<AxiosResponse> {
        return axios.put(`${url}/${id}`, project, {
            withCredentials: true, // Ensures the cookie is sent with the request
        });
    },

    // Delete a project by ID
    async delete(id: string): Promise<AxiosResponse> {
        return axios.delete(`${url}/${id}`, {
            withCredentials: true, // Ensures the cookie is sent with the request
        });
    }
};

export default projectService;

/*
EXAMPLE USAGE:

const [projects, setProjects] = useState<[]>([]);

useEffect(() => {
  projectService.getAll()
    .then(response => setProjects(response.data))
    .catch(error => console.error(error));
}, []);
 */
