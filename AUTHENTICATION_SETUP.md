# Authentication Setup Guide

## Overview

This guide covers the authentication system implementation for the PSL Dashboard, including the recent fixes for the "UntrustedHost" error and the new auth page layout.

## Recent Fixes Applied

### 1. NextAuth Trust Host Configuration

**Issue**: The "UntrustedHost: Host must be trusted" error was occurring because NextAuth.js wasn't configured to trust the Heroku domain.

**Fix**: Added `trustHost: true` to the NextAuth configuration in `src/lib/auth.ts`:

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  // ... other configuration
  trustHost: true, // This fixes the UntrustedHost error
});
```

### 2. Auth Page Layout Redesign

**Issue**: Auth pages were showing the full sidebar with menu items, but the requirement was to show only the app identity and "Powered by" section.

**Fix**: Created a dedicated auth layout (`src/app/auth/layout.tsx`) that:

- Covers the whole page
- Shows app identity ("PSL Dashboard")
- Shows "Powered by Infinix" section
- Includes theme toggle
- Hides menu items (using `opacity-0` for spacing)
- Maintains dark theme styling

## Required Environment Variables

### For Production (Heroku)

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.herokuapp.com
NEXTAUTH_SECRET=your-generated-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
MONGODB_URI=your-mongodb-connection-string
```

### For Local Development

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
MONGODB_URI=mongodb://localhost:27017/psl-dashboard
```

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

### Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - **Production**: `https://your-app-name.herokuapp.com/api/auth/callback/google`
   - **Development**: `http://localhost:3000/api/auth/callback/google`
5. Copy the generated Client ID and Client Secret

### Step 3: Set Environment Variables

Set the credentials as environment variables:

```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## NextAuth Secret Generation

Generate a secure secret for `NEXTAUTH_SECRET`:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Auth Page Layout Structure

The new auth layout (`src/app/auth/layout.tsx`) provides:

### Left Sidebar

- **App Identity**: "PSL Dashboard" title and description
- **Hidden Navigation**: Menu items are hidden but maintain spacing
- **Powered By**: Infinix logo and branding
- **Theme Toggle**: Dark/light mode switch

### Main Content Area

- **Centered Content**: Auth forms and error messages
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Consistent with the app's design

## File Structure

```
src/app/auth/
├── layout.tsx          # New auth layout
├── signin/page.tsx     # Sign-in page
├── signout/page.tsx    # Sign-out page
└── error/page.tsx      # Error page
```

## Troubleshooting

### Common Issues

1. **"UntrustedHost" Error**

   - **Cause**: NextAuth doesn't trust the production domain
   - **Solution**: Ensure `trustHost: true` is in NextAuth config and `NEXTAUTH_URL` is set correctly

2. **"Configuration" Error**

   - **Cause**: Missing or incorrect environment variables
   - **Solution**: Verify all required environment variables are set

3. **Google OAuth Errors**

   - **Cause**: Incorrect redirect URIs or credentials
   - **Solution**: Check Google Cloud Console settings and environment variables

4. **Session Issues**
   - **Cause**: Inconsistent `NEXTAUTH_SECRET` or incorrect `NEXTAUTH_URL`
   - **Solution**: Ensure consistent secret across deployments and correct URL

### Heroku Deployment Checklist

- [ ] Set `NEXTAUTH_URL` to your Heroku app URL
- [ ] Set `NEXTAUTH_SECRET` with a secure random string
- [ ] Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- [ ] Add Heroku domain to Google OAuth redirect URIs
- [ ] Ensure `trustHost: true` is in NextAuth config

### Environment Variable Verification

Check your Heroku environment variables:

```bash
heroku config
```

Verify all required variables are present and correctly set.

## Security Considerations

1. **Never commit secrets** to version control
2. **Use strong, unique secrets** for `NEXTAUTH_SECRET`
3. **Regularly rotate** OAuth credentials
4. **Monitor authentication logs** for suspicious activity
5. **Use HTTPS** in production (Heroku provides this automatically)

## Testing

### Local Testing

```bash
npm run dev
```

Visit `http://localhost:3000/auth/signin` to test authentication flow.

### Production Testing

1. Deploy to Heroku
2. Visit your app's sign-in page
3. Test Google OAuth flow
4. Verify session persistence
5. Test sign-out functionality

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check Heroku logs: `heroku logs --tail`
4. Ensure Google OAuth credentials are properly configured
