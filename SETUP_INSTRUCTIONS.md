# Google OAuth Setup Instructions

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name (e.g., "GBP Automation Platform")
4. Click "Create"

## Step 2: Enable Required APIs

1. In your project, go to "APIs & Services" → "Library"
2. Search for and enable these APIs:
   - **Google My Business API** (for business profile management)
   - **Google+ API** (for user profile information)

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "GBP Automation Platform"
     - User support email: your email
     - Developer contact: your email
   - Add scopes:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `../auth/business.manage`
   - Add test users (your email) if in testing mode

4. Create OAuth client ID:
   - Application type: **Web application**
   - Name: "GBP Platform Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)

## Step 4: Configure Environment Variables

1. Copy the Client ID from the credentials page
2. Create a `.env` file in your project root:

```env
VITE_GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnop.apps.googleusercontent.com
VITE_API_BASE_URL=http://localhost:3001/api
VITE_NODE_ENV=development
```

⚠️ **Important**: Replace `123456789012-abcdefghijklmnop.apps.googleusercontent.com` with your actual Client ID!

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Click "Sign in with Google"
4. You should see the Google consent screen

## Common Issues & Solutions

### "OAuth client was not found" Error
- **Cause**: Invalid or missing Client ID
- **Solution**: Double-check your `.env` file has the correct `VITE_GOOGLE_CLIENT_ID`

### "redirect_uri_mismatch" Error
- **Cause**: Current URL not in authorized redirect URIs
- **Solution**: Add your current URL to authorized redirect URIs in Google Cloud Console

### "access_blocked" Error
- **Cause**: App not verified by Google (for production)
- **Solution**: Submit app for verification or add users as test users

### "scope_not_found" Error
- **Cause**: Required APIs not enabled
- **Solution**: Enable Google My Business API and Google+ API

## Development vs Production

### Development
- Use `http://localhost:5173` in OAuth settings
- App can be in "Testing" mode
- Limited to test users

### Production
- Use your actual domain (e.g., `https://yourdomain.com`)
- App should be "Published" for public use
- May require Google verification for sensitive scopes

## Security Notes

1. **Never commit `.env` to version control**
2. **Keep Client Secret secure** (only used in backend)
3. **Use HTTPS in production**
4. **Regularly rotate credentials**
5. **Monitor OAuth usage** in Google Cloud Console

## Backend Requirements

Your backend needs to handle:
- OAuth token exchange
- Google My Business API calls
- Token refresh
- User session management

The frontend will send the access token to your backend, which should then:
1. Verify the token with Google
2. Exchange for your own session token
3. Store Google tokens securely
4. Make Google My Business API calls on behalf of users