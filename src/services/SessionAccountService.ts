import UserService from "./UserService.ts";

const SESSION_KEY = "user";

// Define the User model interface
export interface User {
    id?: string;  // Use string for GUID as it is a common format in JSON
    username: string;
    avatar: string;
}

const SessionAccountService = {
    /**
     * Get the user data from sessionStorage.
     * @returns The user object or null if not found.
     */
    get(): User | null {
        const userData = sessionStorage.getItem(SESSION_KEY);
        return userData ? JSON.parse(userData) as User : null; // Return User type
    },

    /**
     * Update sessionStorage with the latest user data from UserService.
     * @returns A promise that resolves to the updated user data or null if an error occurs.
     */
    async update(): Promise<User | null> {
        try {
            // Fetch user data from UserService
            const response = await UserService.get(); // Assuming UserService.get() returns an Axios response
            const userData = response.data; // Extract the user data from the response's 'data' property

            if (userData) {
                // Store the entire user data object in sessionStorage as a JSON string
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData));
                return this.get(); // Return the updated user data
            }

            console.warn("No user data returned from UserService.");
            return null;
        } catch (error) {
            console.error("Failed to update session storage with user data:", error);
            return null;
        }
    },

    /**
     * Clear the user data from sessionStorage.
     */
    clear(): void {
        sessionStorage.removeItem(SESSION_KEY);
    },
};

export default SessionAccountService;
