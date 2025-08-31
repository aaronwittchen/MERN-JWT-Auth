# MERN JWT Authentication Frontend

A React frontend for MERN stack applications with JWT authentication, built with Vite, Chakra UI, and React Query.

## Features

- React 19 with Vite
- Chakra UI with dark theme
- React Query for server state management
- React Router v7 with protected routes
- JWT Authentication with automatic token refresh
- Session management
- Email verification and password reset
- TypeScript ready

## Project Structure

```
src/
├── components/      # Reusable UI components
├── config/         # API client and React Query configuration
├── hooks/          # Custom React hooks
├── lib/            # API functions and utilities
├── pages/          # Route components
├── theme/          # Chakra UI theme customization
├── App.jsx
└── main.jsx
```

## Installation

1. **Clone and navigate**
   ```bash
   git clone <your-repo-url>
   cd mern-jwt-auth/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:4004
   VITE_ACCOUNT_TYPE=Your App Name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Routes

### Public Routes
- `/login` - User login
- `/register` - User registration
- `/email/verify/:code` - Email verification
- `/password/forgot` - Password reset request
- `/password/reset` - Password reset form

### Protected Routes
- `/` - User profile (default)
- `/settings` - Session management

## API Integration

### HTTP Client
- Axios instance with base URL and credentials
- Request interceptors for token handling
- Response interceptors for error handling
- Automatic authentication redirects

### Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /auth/logout` - User logout
- `GET /auth/email/verify/:code` - Email verification
- `POST /auth/password/forgot` - Password reset request
- `POST /auth/password/reset` - Password reset
- `GET /user` - Get current user
- `GET /sessions` - Get user sessions
- `DELETE /sessions/:id` - Delete session

## Custom Hooks

- `useAuth()` - Authentication state and user data
- `useSessions()` - User sessions management
- `useDeleteSession()` - Session deletion with optimistic updates

## Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4004` |
| `VITE_ACCOUNT_TYPE` | Application name | `Account` |

### Theme
- Dark mode by default
- Custom Chakra UI components
- Responsive design for all screen sizes

## Build & Deploy

1. **Build**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Output: `dist/` directory
   - Serve static files with your web server
   - Configure environment variables for production

---

Built with React, Vite, and Chakra UI