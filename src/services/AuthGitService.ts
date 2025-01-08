import axios from "axios";
import SessionAccountService from "./SessionAccountService.ts"; // Import the session service

const url = `${import.meta.env.VITE_API_URL}/auth`; // Your API login endpoint
const CLIENT_ID = import.meta.env.VITE_GIT_CLIENT_ID;

const AuthGitService = {
    /**
     * Redirects the user to the GitHub login page.
     */
    async redirectToGitHubLogin() {
        const redirectUri = `${window.location.origin}/Auth/Git`;
        window.location.assign(
            `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user`
        );
    },

    /**
     * Handles the GitHub login process by exchanging the authorization code for a token.
     * @returns A promise that resolves to true on success or false on failure.
     */
    async handleGitHubLogin(): Promise<boolean> {
        const code = AuthGitService.getAuthorizationCode();
        if (!code) {
            console.log("No authorization code found. Redirecting to GitHub login...");
            return false;
        }
        return await AuthGitService.exchangeCodeForToken(code);
    },

    /**
     * Exchanges the authorization code for a token and stores the user data in session storage.
     * @param code - The authorization code.
     * @returns A promise that resolves to true on success or false on failure.
     */
    async exchangeCodeForToken(code: string): Promise<boolean> {
        try {

            await axios.get(`${url}/${code}`, {
                withCredentials: true, // Ensures cookies are sent with the request
            });
            // Update the session using SessionAccountService
            await SessionAccountService.update();

            return true;
        } catch (error) {
            console.error("Error during GitHub login:", error);
            return false;
        }
    },

    /**
     * Extracts the authorization code from the URL query parameters.
     * @returns The authorization code or null if not found.
     */
    getAuthorizationCode(): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("code");
    },
};

export default AuthGitService;
