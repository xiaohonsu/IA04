# User Registration System with JWT Authentication

Full-stack application implementing secure authentication using JWT access and refresh tokens.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://_____.vercel.app) _(update after deployment)_
- **Backend API**: [Deployed on Render](https://_____.onrender.com) _(update after deployment)_
- **GitHub**: [https://github.com/xiaohonsu/IA04](https://github.com/xiaohonsu/IA04)

## 📋 Features

- ✅ User registration with email/password validation
- ✅ JWT-based authentication (Access + Refresh tokens)
- ✅ Automatic token refresh on expiration
- ✅ Protected routes requiring authentication
- ✅ Secure logout with token invalidation
- ✅ Form validation using React Hook Form
- ✅ State management with React Query
- ✅ MongoDB database integration
- ✅ Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (access + refresh tokens)
- **Validation**: class-validator
- **Security**: bcrypt for password hashing

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📁 Project Structure

```
Source/
├── backend/              # NestJS backend
│   ├── src/
│   │   ├── auth/        # Authentication module (JWT)
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/     # Login & refresh token DTOs
│   │   ├── user/        # User module
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── schemas/ # Mongoose schemas
│   │   │   └── dto/     # Registration DTO
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   ├── package.json
│   └── render.yaml      # Render deployment config
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── api/        # API client & auth functions
│   │   │   ├── axios.ts      # Axios instance with interceptors
│   │   │   └── auth.ts       # Auth API calls
│   │   ├── components/ # Reusable components
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── lib/        # Utilities
│   │   │   ├── AuthProvider.tsx  # Auth context
│   │   │   ├── auth.ts           # Token storage
│   │   │   └── utils.ts
│   │   ├── pages/      # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   └── vercel.json     # Vercel deployment config
│
└── DEPLOYMENT.md       # Deployment instructions
```

## 🔐 Authentication Flow

1. **Registration**: User signs up → password hashed with bcrypt → stored in MongoDB
2. **Login**: User logs in → server validates → returns access token (15m) + refresh token (7d)
3. **Token Storage**: 
   - Access token: In-memory (not persisted)
   - Refresh token: localStorage
4. **API Requests**: Axios attaches access token to Authorization header
5. **Token Refresh**: On 401 error → automatically refreshes using refresh token → retries request
6. **Logout**: Clears tokens + invalidates refresh token on server

## 🚀 Local Development

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your values:
# MONGODB_URI=mongodb://localhost:27017/userdb
# JWT_ACCESS_SECRET=your_secret_here
# JWT_REFRESH_SECRET=different_secret_here

# Start development server
npm run start:dev
```

Backend runs on: http://localhost:3000

**API Endpoints:**
- POST `/user/register` - Register new user
- POST `/auth/login` - Login (returns tokens)
- POST `/auth/refresh` - Refresh access token
- POST `/auth/logout` - Logout and invalidate refresh token

### Frontend Setup

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env:
# VITE_API_URL=http://localhost:3000

# Start development server
npm run dev
```

Frontend runs on: http://localhost:5173

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- **Backend**: Render (free tier)
- **Frontend**: Vercel (free tier)

### Quick Deploy Steps

1. Push code to GitHub
2. Deploy backend on Render:
   - Connect repo, set root to `backend`
   - Add environment variables
   - Deploy
3. Deploy frontend on Vercel:
   - Import project, set root to `frontend`
   - Add `VITE_API_URL` with Render URL
   - Deploy
4. Update Render's `FRONTEND_URL` with Vercel URL

## 📝 Environment Variables

### Backend (.env)

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_ACCESS_SECRET=your_32_char_secret_here
JWT_REFRESH_SECRET=different_32_char_secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing

### Manual Testing Flow

1. **Register**: Go to `/signup` → enter email/password → should redirect to login
2. **Login**: Enter credentials → should redirect to dashboard
3. **Dashboard**: Should display user email and welcome message
4. **Protected Route**: Try accessing `/dashboard` without login → should redirect to `/login`
5. **Logout**: Click logout button → should clear tokens and redirect to login
6. **Token Refresh**: Wait 15+ minutes (or reduce expiration) → make API call → should auto-refresh

### Test API with PowerShell

```powershell
# Register
$body = @{email="test@example.com"; password="test123"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/user/register" -Method POST -ContentType "application/json" -Body $body

# Login
$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -ContentType "application/json" -Body $body
$accessToken = $response.accessToken

# Access protected endpoint (add when implemented)
$headers = @{Authorization="Bearer $accessToken"}
Invoke-RestMethod -Uri "http://localhost:3000/user/me" -Headers $headers
```

## 🔒 Security Considerations

### Current Implementation
- ✅ Passwords hashed with bcrypt (salt rounds: 10)
- ✅ JWT tokens with expiration
- ✅ Refresh token rotation on use
- ✅ Refresh tokens stored in DB (can be invalidated)
- ✅ CORS configured for specific origin
- ✅ Input validation with class-validator
- ✅ Access token in memory (not localStorage)

### Production Recommendations
- 🔄 Hash refresh tokens before storing in DB
- 🔄 Use httpOnly cookies for refresh tokens (instead of localStorage)
- 🔄 Implement rate limiting
- 🔄 Add request logging and monitoring
- 🔄 Use environment-specific secrets
- 🔄 Enable HTTPS only in production
- 🔄 Add CSP headers
- 🔄 Implement account lockout after failed attempts

## 📚 API Documentation

### POST /user/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "createdAt": "2025-11-16T..."
  }
}
```

### POST /auth/login
Login and receive tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "user@example.com"
  }
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### POST /auth/logout
Invalidate refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

- **Student ID**: 22127074
- **Course**: Web nâng cao (Advanced Web Development)
- **University**: Đại học (University)
- **Year**: Năm 4 (Year 4)

## 🙏 Acknowledgments

- NestJS documentation
- React Query documentation
- JWT best practices guides
- Vercel & Render deployment guides

---

**Note**: Remember to update the live demo URLs in this README after deploying to Vercel and Render.
