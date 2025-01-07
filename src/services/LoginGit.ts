// services/GitLogin.ts

import axiosInstance from "./AxiosInstance.ts";

const url = `${import.meta.env.VITE_API_URL}/login`; // Your API login endpoint
const CLIENT_ID = import.meta.env.VITE_GIT_CLIENT_ID;

const GitLogin = {
    async redirectToGitHubLogin() {
        const redirectUri = `${window.location.origin}/Auth/Git`;
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`);
    },

    async handleGitHubLogin() {
        const code = GitLogin.getAuthorizationCode();
        if (!code) {
            console.log("No authorization code found. Redirecting to GitHub login...");
            return false;
        }
        return await GitLogin.ExchangeCodeForToken(code);
    },

    async ExchangeCodeForToken(code: string) {
        try {
            const response = await axiosInstance.get(`${url}/${code}`);
            const userData = response.data.user;
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Error during GitHub login:', error);
            return false;
        }
    },

    getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }
};

export default GitLogin;
