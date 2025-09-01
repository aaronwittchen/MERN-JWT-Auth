# MERN JWT Authentication

![Node.js](https://img.shields.io/badge/Node-18%2B-lightgreen)
![Express](https://img.shields.io/badge/Express-4.18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![React](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.5.0-orange)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.7.2-purple)
![JWT](https://img.shields.io/badge/JWT-authentication-yellow)
![ESLint](https://img.shields.io/badge/ESLint-configured-blueviolet)
![Vitest](https://img.shields.io/badge/Vitest-testing-lightgrey)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

A complete, production-ready MERN stack application with JWT authentication, featuring a TypeScript backend and React frontend.

## Features

### Backend (Node.js + Express + TypeScript)

- JWT Authentication with access and refresh tokens
- Session Management with MongoDB storage
- Email Verification system with Resend integration
- Password Reset functionality
- Rate Limiting for API protection
- Security Headers with Helmet
- Input Validation with Zod schemas
- Error Handling with structured responses
- TypeScript for type safety

### Frontend (React + Vite + Chakra UI)

- React 19 with Vite
- Chakra UI with dark theme
- React Query for server state management
- React Router v7 with protected routes
- JWT Authentication with automatic token refresh
- Session Management with device tracking
- Email verification and password reset flows
- Responsive design

## Project Structure

```
mern-jwt-auth/
├── backend/                 # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── config/         # Database and email configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── app.ts          # Express app configuration
│   │   └── server.ts       # Server startup
│   └── package.json
├── frontend/               # React + Vite + Chakra UI
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── config/         # API client and React Query configuration
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route components
│   │   ├── theme/          # Chakra UI theme customization
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

### 1. Clone Repository

```bash
git clone https://github.com/aaronwittchen/MERN-JWT-Auth.git
cd mern-jwt-auth
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your configuration
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file with your configuration
npm run dev
```

### 4. Environment Configuration

#### Backend (.env)

```env
NODE_ENV=development
PORT=4004
MONGO_URI=mongodb://localhost:27017/your-database
APP_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
EMAIL_SENDER=noreply@yourdomain.com
RESEND_API_KEY=your-resend-api-key
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:4004
VITE_ACCOUNT_TYPE=Your App Name
```

## API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/verify/:code` - Verify email
- `POST /auth/password-reset` - Send password reset email
- `POST /auth/reset-password` - Reset password

### Protected Routes

- `GET /user` - Get current user data
- `GET /sessions` - Get user sessions
- `DELETE /sessions/:id` - Delete specific session

## Application Routes

### Public Routes

- `/login` - User authentication
- `/register` - User registration
- `/email/verify/:code` - Email verification
- `/password/forgot` - Password reset request
- `/password/reset` - Password reset form

### Protected Routes

- `/` - User profile (default)
- `/settings` - Session management

## Available Scripts

### Backend

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Security Features

- JWT Token Management with secure generation and validation
- Session Tracking with database-backed session management
- Password Hashing with bcrypt and salt rounds
- Rate Limiting (100 requests per 15 minutes per IP)
- Security Headers with Helmet protection
- CORS Protection with restricted cross-origin access
- Input Validation with Zod schemas

## Deployment

### Backend

1. Build: `npm run build`
2. Start: `npm start`
3. Configure environment variables for production
4. Set up MongoDB connection string

### Frontend

1. Build: `npm run build`
2. Serve the `dist/` directory
3. Configure environment variables for production

## Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

---

Built with the MERN stack
