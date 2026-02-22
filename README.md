# GeoIP Web

This is the React (Vite) frontend for the JLabs Developer Assessment challenge.  
It provides a login screen and a home dashboard displaying IP geolocation information using the ipinfo.io API.

**Live deployment**: https://jlabs-web-six.vercel.app/

**Backend repo**: https://github.com/matthewjohnlempio-cmd/jlabs-api  
**Backend live**: https://jlabs-api.vercel.app/

## Features
- Login page with email/password authentication (connects to backend `/login` endpoint)
- Home dashboard showing user's current IP and geolocation
- Manual IP search with validation and error handling
- Search history list with click-to-reload and multi-delete
- Interactive map with marker (using Leaflet/React-Leaflet)
- Responsive design
- Deployed on Vercel

## Tech Stack
- React + Vite
- Axios (API requests)
- React Router (navigation)
- Leaflet + react-leaflet (map display)
- Tailwind CSS (styling)
- Vercel (deployment)

## Prerequisites
- Node.js v18+ and npm

## Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/matthewjohnlempio-cmd/jlabs-web.git
   cd jlabs-web

2. **Install dependencies**
   
   This command reads the `package.json` file and automatically installs all required packages (express, mongoose, bcryptjs, etc.).
   
   ```bash
   npm install
   ```
   
3. **Set up environment variables**
   
   The project uses a .env file to point to the backend API.
   This file is not included in the repository.Folder structure (root level):
   
   **Folder structure (root level):**
   ```text
   jlabs-web/                  ← root folder
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── ...
    ├── public/
    ├── .env                    ← CREATE THIS FILE HERE
    ├── package.json
    └── vite.config.js
   ```
   How to create .env:
    - In the root folder (jlabs-web/), create a new file named exactly .env
    - Open .env and add:
      
   ```text
   # Backend API base URL
   # For local development (when backend runs on localhost)
   VITE_API_URL=http://localhost:8000
  
   # For production (your deployed backend)
   # VITE_API_URL=https://(name).vercel.app
   ```
    Tip: Use http://localhost:8000 when testing locally with the backend running.
    Change to the live backend URL when deploying.

4. Start the development server
   ```bash
   npm run dev
   ```
     → Opens automatically at http://localhost:5173 (Vite default port)

5. Test the app
    - Go to http://localhost:5173/login
    - Log in with:
      -  Email: (you have to seed the user in the backend read the README.md file link: https://github.com/matthewjohnlempio-cmd/jlabs-api)
      -  Password: (you have to seed the user in the backend read the README.md file link: https://github.com/matthewjohnlempio-cmd/jlabs-api)
    
    - After login → redirects to home dashboard with your IP geolocation
    - Test IP search, history, map, delete, etc.

##Troubleshooting
  - Network Error on login: Ensure backend is running on http://localhost:8000 and CORS allows http://localhost:5173
  - Map not loading: Check Leaflet/react-leaflet imports and that coords from ipinfo.io are valid
  - Invalid IP error: ipinfo.io validates format — try valid IPs like 8.8.8.8
  - No token after login: Check localStorage (DevTools → Application → Local Storage)

## License
ISC

Submitted for JLabs Developer Assessment – February 2026 Matthew John Lempio


   

   
