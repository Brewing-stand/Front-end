import axios, {AxiosResponse} from 'axios';

const url = `${import.meta.env.VITE_API_URL}/login`; // Replace with your API endpoint
const CLIENT_ID = import.meta.env.VITE_GIT_CLIENT_ID;

const GitLogin = {
    async CallGit() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user`);
    },

    async Login() {
        const code = GitLogin.GetCode()

        if (!code) {
            console.log("returning")
            return
        }

        console.log(code)

        await GitLogin.RetrieveToken(code)
    },

    async RetrieveToken(code: string) {

        await axios.get(`${url}/${code}`)
            .then((response: AxiosResponse<AxiosResponse>) => {
                console.log(response);
            }).then((data) => {
                console.log(data);
            })
        console.log()
    },

    GetCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }
};

export default GitLogin;
