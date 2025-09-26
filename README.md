# DTT Houses Assessment - Solution

## Overview

Vue 3 + Vite project implementing the DTT Houses assessment requirements.
The app connects to the DTT Houses API but can also fall back to **mock data** if the API is unreachable (e.g., when running in restricted environments like online sandboxes).

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create an `.env` file in the project root

The `.env` file should be **in the project root** (next to `package.json`), not inside `src/`.

Example `.env` file:

```env
VITE_API_BASE=http://localhost:8080
VITE_API_KEY=b4VOoCUep6SxWIrdAyG8FKRhzt5BHg-k
```

* All variables must start with `VITE_` to be available in the app (`import.meta.env`).
* If you want to keep your key private, add `.env` to `.gitignore` and create an `.env.example` with placeholder values.

Example `.env.example`:

```env
VITE_API_BASE=http://localhost:8080
VITE_API_KEY=YOUR_API_KEY_HERE
```

### 3. Run the project

```bash
npm run dev
```

---

## Notes

* The API requires an `x-api-key` header. The app reads that key from `VITE_API_KEY`.
* State management uses **Pinia**.
* Favorites and created listing IDs are stored in **localStorage**.

---

## Handling Network Errors

During development, Axios sometimes threw:

```
AxiosError: Network Error
```

**Reason:**
This happens when the frontend runs in an environment that cannot reach `http://localhost:8080` or `https://api.intern.d-tt.nl/api`.
For example, online containers (like StackBlitz or CodeSandbox) block requests to external/local APIs, so Axios cannot connect and throws a `Network Error`.

---

## Mock Data Fallback

To keep the app functional without a backend:

* The project includes **mock data**.
* When the API is available → real API is used.
* When the API is unreachable → the app automatically switches to **mock data**.

This ensures the UI, favorites management, and create-listing flows remain testable even without a live backend.

---

## Environment-Specific Config (Optional)

You can also create separate env files for different environments:

* `.env.development` → used by `npm run dev`
* `.env.production` → used by `npm run build`

Example:

```env
# .env.development
VITE_API_BASE=http://localhost:8080
VITE_API_KEY=YOUR_LOCAL_KEY

# .env.production
VITE_API_BASE=https://api.intern.d-tt.nl/api
VITE_API_KEY=YOUR_PRODUCTION_KEY
```

---

✅ This setup ensures:

* Easy switching between **local API**, **production API**, and **mock data**.
* No broken UI when the backend is unavailable.
