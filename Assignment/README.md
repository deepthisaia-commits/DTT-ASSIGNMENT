# DTT Houses Assessment - Solution

## Overview
Vue 3 + Vite project implementing the DTT Houses assessment requirements.

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file in the project root with:
   VITE_API_BASE=http://localhost:8080
   VITE_API_KEY=YOUR_API_KEY_HERE
3. Run: `npm run dev`

Notes:
- The API at http://localhost:8080 requires an 'x-api-key' header. The app reads that key from VITE_API_KEY.
- The project uses Pinia for state and stores favorites and created listing ids in localStorage.
