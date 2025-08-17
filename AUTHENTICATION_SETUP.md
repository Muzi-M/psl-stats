# Authentication Setup Guide

This document provides comprehensive guidance for setting up and troubleshooting authentication in the PSL Dashboard application.

## Overview

The PSL Dashboard uses NextAuth.js with Google OAuth for authentication. The system is designed to provide secure, seamless authentication with proper session management.

## Configuration

### Environment Variables

Ensure the following environment variables are properly configured:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/psl-dashboard
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add your domain to the authorized origins:
   - `https://your-domain.com`
   - `http://localhost:3000` (for development)
6. Add authorized redirect URIs:
   - `https://your-domain.com/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

## Recent Fixes and Improvements

### Logo Display Issues (Fixed)

**Problem**: Logos were not displaying properly and showing fallback "I" icons.

**Solution**:

- Updated to use Next.js `Image` component for better optimization
- Added proper error handling and loading states
- Improved image container styling with `overflow-hidden`

**Files Modified**:

- `src/app/auth/layout.tsx`

### OAuth Flow Issues (Fixed)

**Problem**: Users were being redirected back to the sign-in page after clicking "Sign in with Google".

**Root Causes**:

1. Cookie detection issues in middleware
2. Improper session token handling
3. Missing secure cookie configuration

**Solutions**:

1. **Enhanced Middleware**: Improved cookie detection logic to properly validate session tokens
2. **NextAuth Configuration**: Added explicit cookie configuration and session management
3. **Sign-in Flow**: Updated to handle authentication results properly with better error handling

**Files Modified**:

- `src/lib/auth.ts`
- `src/middleware.ts`
- `src/app/auth/signin/page.tsx`

## Troubleshooting

### Common Issues and Solutions

#### 1. Logo Not Displaying

**Symptoms**:

- Icons showing instead of logos
- Console errors about image loading

**Solutions**:

- Verify the logo file exists in `/public/Infinix_logo-removebg-preview.png`
- Check browser console for CORS or loading errors
- Ensure the image path is correct in the code

#### 2. OAuth Redirect Loop

**Symptoms**:

- User clicks "Sign in with Google" but stays on sign-in page
- Console shows authentication cookies as "null"

**Solutions**:

1. **Check Environment Variables**:

   ```bash
   # Verify these are set correctly
   echo $GOOGLE_CLIENT_ID
   echo $GOOGLE_CLIENT_SECRET
   echo $NEXTAUTH_SECRET
   echo $NEXTAUTH_URL
   ```

2. **Verify Google OAuth Configuration**:

   - Ensure redirect URIs are correct
   - Check that the domain is authorized
   - Verify API is enabled in Google Cloud Console

3. **Check Cookie Settings**:
   - Ensure `NEXTAUTH_URL` matches your domain exactly
   - For production, use HTTPS
   - Check browser cookie settings

#### 3. Session Not Persisting

**Symptoms**:

- User gets logged out after page refresh
- Middleware logs show no valid session tokens

**Solutions**:

1. **Check NEXTAUTH_SECRET**:

   - Must be a strong, unique secret
   - Should be at least 32 characters
   - Must be consistent across deployments

2. **Verify Cookie Configuration**:
   - Production: Use `__Secure-` prefixed cookies
   - Development: Use standard cookies
   - Ensure `sameSite` and `secure` settings are correct

#### 4. MongoDB Connection Issues

**Symptoms**:

- Authentication fails with database errors
- Session data not persisting

**Solutions**:

1. **Check MongoDB URI**:

   - Ensure connection string is correct
   - Verify network access and credentials
   - Check if database exists

2. **Verify MongoDB Adapter**:
   - Ensure `@auth/mongodb-adapter` is installed
   - Check that collections are created automatically

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

This will provide detailed logs for:

- NextAuth callbacks
- Middleware decisions
- Session management
- OAuth flow

### Production Deployment Checklist

1. **Environment Variables**:

   - [ ] `NEXTAUTH_URL` set to production domain
   - [ ] `NEXTAUTH_SECRET` is strong and unique
   - [ ] `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` configured
   - [ ] `MONGODB_URI` points to production database

2. **Google OAuth**:

   - [ ] Production domain added to authorized origins
   - [ ] Production callback URL configured
   - [ ] API enabled in Google Cloud Console

3. **Security**:

   - [ ] HTTPS enabled
   - [ ] Secure cookies configured
   - [ ] CORS settings appropriate

4. **Monitoring**:
   - [ ] Error logging enabled
   - [ ] Authentication metrics tracked
   - [ ] Session monitoring in place

## Testing

### Local Development Testing

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Test authentication flow**:

   - Navigate to `/auth/signin`
   - Click "Continue with Google"
   - Verify redirect to Google OAuth
   - Complete authentication
   - Verify redirect back to dashboard

3. **Test session persistence**:
   - Refresh the page
   - Verify user remains logged in
   - Check browser cookies

### Production Testing

1. **Deploy to staging environment**
2. **Test with production Google OAuth credentials**
3. **Verify all environment variables**
4. **Test authentication flow end-to-end**
5. **Monitor logs for any issues**

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **HTTPS**: Always use HTTPS in production
3. **Cookie Security**: Use secure, httpOnly cookies
4. **Session Management**: Implement proper session timeouts
5. **Error Handling**: Don't expose sensitive information in error messages

## Support

If you encounter issues not covered in this guide:

1. Check the application logs for detailed error messages
2. Verify all environment variables are correctly set
3. Test with a fresh browser session (clear cookies)
4. Review the NextAuth.js documentation for additional guidance
5. Check Google Cloud Console for OAuth configuration issues

## Recent Updates

- **2025-08-17**: Fixed logo display issues and OAuth flow problems
- **2025-08-17**: Enhanced middleware cookie detection
- **2025-08-17**: Improved error handling in sign-in flow
- **2025-08-17**: Added comprehensive troubleshooting guide
