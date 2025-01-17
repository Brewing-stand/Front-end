# Front-end

## Description
The Front-End is built with **React**, **Vite**, and **TypeScript**, using **Ant Design** for components and **Tailwind** for styling. The Front-end application acts as the User interface for the project.

## Purpose
The Front-End of the Brewing Stand project serves as the primary user interface, allowing users to interact with the platform in an intuitive and user-friendly way. It provides functionality for:

- User Authentication: Enabling users to log in via GitHub and manage their account settings, including consent for data usage.
- Project Management: Allowing users to create, view, update, and delete projects, as well as manage project-specific data.
- Visualization of Recipes: Displaying recipes and enabling users to create and edit them, including integration with modded Minecraft data.
- Collaboration: Facilitating the sharing of project data and collaborative editing features.
  
## Getting started

### Running locally

#### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** (comes with Node.js) or **yarn** for package management
- **Vite** (installed globally is optional but recommended)

#### 1. Clone the Repository
Start by cloning the project repository to your local machine:
```bash
git clone https://github.com/Nelissen-searchable-db/Front-end
```

#### 2. Install Dependencies
Navigate to the project directory and install the required dependencies using npm:
```bash
npm install
```

#### 3. Run the Development Server
Start the development server using Vite:
```bash
npm run dev
```

#### 4. Access the Application
Once the server is running, open your browser and navigate to:
```bash
http://localhost:5173
```
You should now see the front-end application running!

## environment variables

### 1. create .env file

Create a .env file in the root folder of the project called ".env"

### 2. Add the env variables

Copy the env variables below into the .env file you just created

```bash
VITE_API_URL=https://API_URL:PORT/PATH
```

### 3. Specify values

Alter the .env file with the correct values

```bash
VITE_API_URL=https://API_URL:PORT/PATH
```

#### where

- **API_URL** is the URL to your API
- **PORT** is the port on which the API receives calls
- **PATH** is the default path to your API calls (leave empty if there is no default path)

### example

```bash
VITE_API_URL=https://nelissen:123/api
```
