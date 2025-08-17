# Authentication System Documentation

## Overview

The PSL Dashboard now includes a comprehensive authentication system built with NextAuth.js v5 and Google OAuth. This system provides secure user authentication with a modern, responsive UI.

## Features

- **Google OAuth Integration**: Secure authentication using Google accounts
- **Session Management**: Persistent sessions with JWT tokens
- **Route Protection**: Middleware-based route protection
- **User Profile Management**: User avatar and profile dropdown
- **Responsive Design**: Mobile-friendly authentication pages
- **Error Handling**: Comprehensive error pages and handling
- **MongoDB Integration**: User data stored in MongoDB

## Architecture

### Components

1. **Authentication Configuration** (`src/lib/auth.ts`)

   - NextAuth.js configuration
   - Google OAuth provider setup
   - MongoDB adapter integration
   - Session and JWT callbacks

2. **MongoDB Client** (`src/lib/mongodb.ts`)

   - MongoDB connection management
   - Development and production configurations

3. **API Routes** (`src/app/api/auth/[...nextauth]/route.ts`)

   - NextAuth.js API handlers
   - Authentication endpoints

4. **Middleware** (`src/middleware.ts`)

   - Route protection
   - Authentication state checking
   - Redirect logic

5. **UI Components**
   - `SessionProvider`: NextAuth session wrapper
   - `UserProfile`: User avatar and dropdown menu
   - `Header`: Updated header with user profile integration

### Pages

1. **Sign In Page** (`src/app/auth/signin/page.tsx`)

   - Beautiful login interface
   - Google OAuth button
   - Feature highlights
   - Responsive design

2. **Error Page** (`src/app/auth/error/page.tsx`)

   - Authentication error handling
   - User-friendly error messages
   - Navigation back to sign in

3. **Sign Out Page** (`src/app/auth/signout/page.tsx`)
   - Confirmation page
   - Automatic sign out
   - Manual sign out option

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/psl-dashboard
```

### 2. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

### 3. MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `psl-dashboard`
3. Update the `MONGODB_URI` in your `.env.local` file

### 4. NextAuth Secret

Generate a secure random string for `NEXTAUTH_SECRET`:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or use a secure random string generator
```

## Usage

### Authentication Flow

1. **Unauthenticated User**: Redirected to `/auth/signin`
2. **Google Sign In**: User clicks "Continue with Google"
3. **OAuth Flow**: Google OAuth authentication
4. **Session Creation**: User session created and stored
5. **Redirect**: User redirected to dashboard
6. **Protected Routes**: All routes now require authentication

### User Profile

- **Avatar**: Displays user's Google profile picture
- **Dropdown Menu**: Access to profile, settings, and sign out
- **Session Management**: Automatic session handling

### Sign Out

- **Manual**: User clicks sign out in dropdown
- **Automatic**: Session expires after configured time
- **Redirect**: User redirected to sign in page

## Security Features

### Route Protection

- **Middleware**: All routes protected by default
- **Public Routes**: Only auth pages are public
- **Automatic Redirects**: Unauthenticated users redirected to sign in

### Session Security

- **JWT Tokens**: Secure session management
- **MongoDB Storage**: User data securely stored
- **HTTPS Only**: Production requires HTTPS

### OAuth Security

- **Google OAuth**: Industry-standard authentication
- **Secure Callbacks**: Protected callback URLs
- **Token Validation**: Automatic token validation

## Customization

### Styling

The authentication pages use Tailwind CSS and can be customized by modifying:

- `src/app/auth/signin/page.tsx` - Sign in page styling
- `src/app/auth/error/page.tsx` - Error page styling
- `src/app/auth/signout/page.tsx` - Sign out page styling
- `src/components/UserProfile.tsx` - User profile component styling

### Configuration

Modify authentication settings in `src/lib/auth.ts`:

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Add additional providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],

  // Customize callbacks
  callbacks: {
    async session({ session, user }) {
      // Custom session logic
      return session;
    },
  },

  // Customize pages
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});
```

### Adding More Providers

To add additional authentication providers:

1. Install the provider package
2. Add the provider to the configuration
3. Update the sign-in page UI
4. Test the authentication flow

## Troubleshooting

### Common Issues

1. **"Invalid OAuth redirect URI"**

   - Ensure the redirect URI in Google Console matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"MongoDB connection failed"**

   - Verify MongoDB is running
   - Check the connection string format
   - Ensure network access if using Atlas

3. **"NextAuth secret not set"**

   - Generate and set the `NEXTAUTH_SECRET` environment variable
   - Use a secure random string

4. **"Session not persisting"**
   - Check browser cookie settings
   - Verify HTTPS in production
   - Check session configuration

### Debug Mode

Enable debug mode by adding to your `.env.local`:

```bash
NEXTAUTH_DEBUG=true
```

## Production Deployment

### Environment Variables

Update environment variables for production:

```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
MONGODB_URI=your-production-mongodb-uri
```

### Google OAuth

1. Update authorized redirect URIs in Google Console
2. Add production domain to authorized origins
3. Test authentication flow in production

### Security Checklist

- [ ] HTTPS enabled
- [ ] Secure environment variables
- [ ] Production MongoDB connection
- [ ] Google OAuth production credentials
- [ ] NextAuth secret properly set
- [ ] Error pages configured
- [ ] Session timeout configured

## API Reference

### NextAuth Functions

```typescript
import { signIn, signOut, getSession } from "next-auth/react";

// Sign in with Google
await signIn("google", { callbackUrl: "/" });

// Sign out
await signOut({ callbackUrl: "/auth/signin" });

// Get current session
const session = await getSession();
```

### Server-Side Authentication

```typescript
import { auth } from "@/lib/auth";

// Get session in server component
const session = await auth();

// Check authentication status
if (!session) {
  // Handle unauthenticated user
}
```

### Middleware Functions

```typescript
import { auth } from "@/lib/auth";

// Protect routes
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  // Custom logic
});
```

## Contributing

When contributing to the authentication system:

1. Follow the existing code structure
2. Add comprehensive error handling
3. Update documentation for new features
4. Test authentication flows thoroughly
5. Ensure security best practices

## Support

For authentication-related issues:

1. Check the troubleshooting section
2. Review NextAuth.js documentation
3. Verify environment variable configuration
4. Test with debug mode enabled
5. Check browser console for errors
