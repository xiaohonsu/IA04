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

## Technologies

- NestJS
- MongoDB + Mongoose
- bcrypt
- class-validator
