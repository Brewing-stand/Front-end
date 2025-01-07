import axiosInstance from "./AxiosInstance.ts";

const url = `${import.meta.env.VITE_API_URL}/auth`; // Replace with your API endpoint for logout

const AuthService = {
    async logout() {
        // send logout request to api
        await axiosInstance.post(`${url}/logout`).then(() => {
            localStorage.removeItem('user');
        })
    },
};

export default AuthService;
