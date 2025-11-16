# Frontend - User Registration System

React frontend application for user registration system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Update VITE_API_URL if backend is running on different port
```

## Environment

Create `.env` or `.env.local` with:

```
VITE_API_URL=http://localhost:3000
```

This project integrates JWT authentication endpoints at `/auth` (login/refresh/logout) on the backend. The frontend stores refresh tokens in localStorage and access tokens in memory.

3. Start development server:
```bash
npm run dev
```

## Features

- Home page with navigation
- Sign Up page with form validation and API integration
- Login page with UI (no backend logic)
- React Query for API state management
- Tailwind CSS styling

## Technologies

- React 18
- TypeScript
- Vite
- React Router
- React Hook Form
- TanStack Query (React Query)
- Tailwind CSS
