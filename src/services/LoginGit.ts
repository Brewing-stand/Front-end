import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/login`; // Replace with your API endpoint
const CLIENT_ID = import.meta.env.VITE_GIT_CLIENT_ID;

const GitLogin = {
    async redirectToGitHubLogin() {
        // Dynamically determine the host and set the callback URL
        const redirectUri = `${window.location.origin}/Auth/Git`;

        // Redirect to GitHub OAuth
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`);
    },

    async handleGitHubLogin() {

        const code = GitLogin.getAuthorizationCode();

        if (!code) {
            console.log("No authorization code found. Redirecting to GitHub login...");
            return false;
        }

        // Exchange the authorization code for a token
        return await GitLogin.ExchangeCodeForToken(code);
    },

    async ExchangeCodeForToken(code: string) {

        try {
            const response = await axios.get(`${url}/${code}`, {
                withCredentials: true, // Ensures cookies are sent and received
            });

            // Store user info and token in localStorage (or React context)
            const userData = response.data.user;

            // Save user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            return true; // Return true after successful login
        } catch (error) {
            console.error('Error during GitHub login:', error);
            return false; // Return false if there's an error
        }
    },

    getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }
};

export default GitLogin;
