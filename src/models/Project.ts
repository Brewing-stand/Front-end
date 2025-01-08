export interface Project {
    id?: string;  // Use string for GUID as it is a common format in JSON
    ownerId?: string;  // Similarly, GUIDs for ownerId
    name: string;
    description: string;
}
