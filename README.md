# Google Business Profile Automation Platform

A modern React application that allows users to connect their Google accounts and manage their Google Business Profiles through a centralized dashboard.

## Architecture Overview

### Frontend (React)
- **User Authentication**: Google OAuth with proper scopes for Google My Business API
- **Profile Management**: View, search, and filter business profiles
- **Dashboard**: Analytics and activity monitoring
- **Responsive Design**: Works on desktop and mobile devices

### Backend Requirements
The frontend expects a backend API that handles:
- Google OAuth token exchange and refresh
- Google My Business API integration
- User session management
- Business profile data fetching and caching

## Google OAuth Setup

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google My Business API
   - Google+ API (for user profile)
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized origins: `http://localhost:5173`, `https://yourdomain.com`
   - Authorized redirect URIs: `http://localhost:5173`, `https://yourdomain.com`

### 2. Required OAuth Scopes
```javascript
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile', 
  'https://www.googleapis.com/auth/business.manage'
];
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_BASE_URL=http://localhost:3001/api
```

## Backend API Endpoints

### Authentication
- `POST /api/auth/google` - Exchange Google auth code for backend token
- `GET /api/auth/verify` - Verify backend token  
- `POST /api/auth/signout` - Sign out user

### Business Profiles
- `GET /api/business-profiles` - Get user's business profiles
- `GET /api/business-profiles/:id` - Get specific profile
- `PATCH /api/business-profiles/:id` - Update profile
- `GET /api/business-profiles/:id/analytics` - Get profile analytics

### Posts & Reviews
- `POST /api/business-profiles/:id/posts` - Create post
- `GET /api/business-profiles/:id/posts` - Get posts
- `GET /api/business-profiles/:id/reviews` - Get reviews
- `POST /api/business-profiles/:id/reviews/:reviewId/reply` - Reply to review

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get recent activity

## User Flow

1. **Sign In**: User clicks "Sign in with Google"
2. **OAuth Consent**: Google shows consent screen with required permissions
3. **Token Exchange**: Frontend sends auth code to backend
4. **Profile Fetch**: Backend uses Google My Business API to fetch profiles
5. **Dashboard**: User sees their profiles and can manage them

## Key Features

### For Users
- **Simple Authentication**: Just sign in with Google account
- **No Technical Setup**: No need to create API keys or configure anything
- **Comprehensive Management**: View all business profiles in one place
- **Real-time Updates**: Automatic syncing with Google My Business

### For Developers
- **Server-side API Management**: All Google API calls handled by backend
- **Secure Token Handling**: OAuth tokens stored securely on server
- **Rate Limit Management**: Backend handles API quotas and limits
- **Error Handling**: Robust error handling and user feedback

## Security Considerations

1. **Token Storage**: Access tokens stored server-side, not in browser
2. **Refresh Tokens**: Automatic token refresh handled by backend
3. **Scope Validation**: Backend validates all API requests
4. **Rate Limiting**: Implement rate limiting on backend endpoints
5. **CORS**: Configure CORS properly for production

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build
```

## Production Deployment

1. Build the React app: `npm run build`
2. Deploy to your hosting service (Vercel, Netlify, etc.)
3. Update Google OAuth settings with production URLs
4. Set production environment variables
5. Deploy backend API to handle Google My Business integration

## Backend Implementation Example

The backend should:
1. Exchange Google auth codes for access/refresh tokens
2. Store tokens securely (encrypted in database)
3. Make Google My Business API calls on behalf of users
4. Handle token refresh automatically
5. Provide REST API for frontend consumption

This architecture ensures users only need to sign in with Google while you handle all the technical complexity server-side.