# MERN JWT Authentication Backend

![Node.js](https://img.shields.io/badge/Node-18%2B-lightgreen)
![Express](https://img.shields.io/badge/Express-4.18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![Mongoose](https://img.shields.io/badge/Mongoose-7.7.0-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)
![JWT](https://img.shields.io/badge/JWT-authentication-yellow)
![Zod](https://img.shields.io/badge/Zod-validation-lightgrey)
![Helmet](https://img.shields.io/badge/Helmet-security-blueviolet)
![ESLint](https://img.shields.io/badge/ESLint-configured-blue)
![Jest](https://img.shields.io/badge/Jest-testing-red)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

A robust, production-ready backend for MERN stack applications with JWT authentication, built with TypeScript, Express, and MongoDB.

## Features

- JWT Authentication with access and refresh tokens
- Session Management with MongoDB
- Email Verification system
- Password Reset functionality
- Rate Limiting for API protection
- Security Headers with Helmet
- Input Validation with Zod schemas
- Error Handling with structured responses
- TypeScript for type safety
- MongoDB with Mongoose ODM
- Graceful Shutdown handling
- Database Connection retry logic

## Project Structure

```
src/
├── config/          # Configuration files (database, email)
├── constants/       # Application constants and enums
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Mongoose models
├── routes/          # API route definitions
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── server.ts        # Server startup and lifecycle
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd mern-jwt-auth/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

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

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm test` - Run tests with coverage

## API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/verify/:code` - Verify email
- `POST /auth/password-reset` - Send password reset email
- `POST /auth/reset-password` - Reset password

### Protected Routes

- `GET /user/*` - User-related endpoints (requires authentication)
- `GET /sessions/*` - Session management (requires authentication)

### Health Check

- `GET /health` - Server health status

### Database Configuration

The application includes optimized MongoDB connection settings:

- Connection pooling with max 10 connections
- 5-second server selection timeout
- 45-second socket timeout
- Automatic retry logic (5 attempts with 5-second delays)

## Error Handling

All API responses follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errorCode": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "requestId": "abc123"
}
```

### Error Types

- Validation Errors: Zod schema validation failures
- Authentication Errors: JWT token issues
- Database Errors: MongoDB operation failures
- Application Errors: Custom business logic errors

## Security Features

- JWT Token Management: Secure token generation and validation
- Session Tracking: Database-backed session management
- Password Hashing: Bcrypt with salt rounds
- Rate Limiting: 100 requests per 15 minutes per IP
- Security Headers: Helmet for protection against common attacks
- CORS Protection: Restricted cross-origin access

## Testing

The project includes Jest testing setup with:

- Test coverage reporting
- MongoDB memory server for testing
- Supertest for API endpoint testing
- TypeScript support

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the production server**

   ```bash
   npm start
   ```

3. **Environment Setup**
   - Ensure all required environment variables are set
   - Configure MongoDB connection string
   - Set up proper CORS origins for production

---

Built with TypeScript, Express, and MongoDB
