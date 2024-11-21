import axios, {AxiosResponse} from 'axios';

const url = `${import.meta.env.VITE_API_URL}/recipe`; // Replace with your API endpoint

const projectService = {
    async getAll(): Promise<AxiosResponse<[]>> {
        return axios.get(url);
    },

    async get(id: number): Promise<AxiosResponse> {
        return axios.get(`${url}/${id}`);
    }
};

export default projectService;

/*
EXAMPLE USAGE:

const [projects, setProjects] = useState<[]>([]);

useEffect(() => {
    RecipeService.getAll()
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);
 */
