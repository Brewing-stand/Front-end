export interface User {
    id?: string;  // Use string for GUID as it is a common format in JSON
    username: string;
    avatar: string;
}
