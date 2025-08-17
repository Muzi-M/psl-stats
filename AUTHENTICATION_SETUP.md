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

### Logo Display Issues (Fixed - Latest Update)

**Problem**: Logos were not displaying properly and showing fallback "I" icons.

**Latest Solution**:

- Reverted to regular `<img>` tags for better compatibility
- Added fallback logo path (`/infinix-fav-icon.png`) if main logo fails
- Improved error handling with multiple fallback attempts
- Added test page at `/test-logos` to verify logo accessibility

**Files Modified**:

- `src/app/auth/layout.tsx`
- `src/app/test-logos/page.tsx` (new test page)

### OAuth Flow Issues (Fixed - Latest Update)

**Problem**: Users were being redirected back to the sign-in page after clicking "Sign in with Google".

**Latest Solutions**:

1. **Simplified Middleware**: Reduced complexity in cookie detection to focus on core authentication
2. **Enhanced NextAuth Configuration**: Added explicit cookie configuration for all NextAuth cookies
3. **Improved Sign-in Flow**: Reverted to automatic redirect handling for better OAuth flow
4. **Debug Mode**: Enabled comprehensive logging to track authentication issues

**Files Modified**:

- `src/lib/auth.ts`
- `src/middleware.ts`
- `src/app/auth/signin/page.tsx`

## Current Issues and Solutions

### Issue 1: Logo Loading Failures

**Symptoms**:

- Console errors: "Logo failed to load"
- Icons showing instead of logos

**Immediate Solutions**:

1. **Test Logo Accessibility**: Visit `/test-logos` to verify logo files are accessible
2. **Check File Paths**: Ensure logo files exist in `/public/` directory
3. **Fallback System**: The system now tries multiple logo paths automatically

**Debugging Steps**:

```bash
# Check if logo files exist
ls -la public/Infinix_logo-removebg-preview.png
ls -la public/infinix-fav-icon.png

# Test logo accessibility
curl -I https://your-domain.com/Infinix_logo-removebg-preview.png
curl -I https://your-domain.com/infinix-fav-icon.png
```

### Issue 2: OAuth Redirect Loop

**Symptoms**:

- Sign-in appears successful but user stays on sign-in page
- No authentication cookies being set
- Middleware logs show all cookies as "null"

**Immediate Solutions**:

1. **Verify Environment Variables**:

   ```bash
   heroku config:get NEXTAUTH_URL
   heroku config:get NEXTAUTH_SECRET
   heroku config:get GOOGLE_CLIENT_ID
   heroku config:get GOOGLE_CLIENT_SECRET
   ```

2. **Check Google OAuth Configuration**:

   - Ensure redirect URI is exactly: `https://infinixdigital-footy-48dc94474adc.herokuapp.com/api/auth/callback/google`
   - Verify domain is authorized in Google Cloud Console

3. **Clear Browser Data**:
   - Clear cookies and cache
   - Try in incognito/private mode

## Troubleshooting

### Common Issues and Solutions

#### 1. Logo Not Displaying

**Symptoms**:

- Icons showing instead of logos
- Console errors about image loading

**Solutions**:

- Visit `/test-logos` to verify logo accessibility
- Check browser console for CORS or loading errors
- Verify the image paths are correct
- Check if files exist in the public directory

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

2. **Test logo accessibility**:

   - Visit `http://localhost:3000/test-logos`
   - Verify both logos load successfully

3. **Test authentication flow**:

   - Navigate to `/auth/signin`
   - Click "Continue with Google"
   - Verify redirect to Google OAuth
   - Complete authentication
   - Verify redirect back to dashboard

4. **Test session persistence**:
   - Refresh the page
   - Verify user remains logged in
   - Check browser cookies

### Production Testing

1. **Deploy to staging environment**
2. **Test logo accessibility**:
   - Visit `https://your-domain.com/test-logos`
   - Verify logos load correctly
3. **Test with production Google OAuth credentials**
4. **Verify all environment variables**
5. **Test authentication flow end-to-end**
6. **Monitor logs for any issues**

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
6. Visit `/test-logos` to verify logo accessibility

## Recent Updates

- **2025-08-17**: Fixed logo display issues with fallback system
- **2025-08-17**: Simplified middleware for better OAuth flow
- **2025-08-17**: Enhanced NextAuth configuration with explicit cookie settings
- **2025-08-17**: Added test page for logo verification
- **2025-08-17**: Updated troubleshooting guide with current issues
