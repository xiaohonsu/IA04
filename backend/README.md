# Backend - User Registration API

NestJS backend API for user registration system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Update MONGODB_URI if needed
```

3. Start development server:
```bash
npm run start:dev
```

## API Endpoints

- `POST /user/register` - Register a new user
 - `POST /auth/login` - Login with email/password -> returns { accessToken, refreshToken, user }
 - `POST /auth/refresh` - Refresh tokens using { refreshToken } -> returns { accessToken, refreshToken }
 - `POST /auth/logout` - Logout and invalidate refresh token using { refreshToken }

## Environment variables (examples)

Create `backend/.env` with:

```
MONGODB_URI=mongodb://localhost:27017/userdb
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=some_secret_for_access
JWT_REFRESH_SECRET=some_secret_for_refresh
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

## Technologies

- NestJS
- MongoDB + Mongoose
- bcrypt
- class-validator
