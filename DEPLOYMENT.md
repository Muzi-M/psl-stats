# PSL Dashboard Deployment Guide

## Fixed Issues ✅

- Fixed typo in `package.json`: `tailwindncss` → `tailwindcss`
- Updated `Procfile` to use `npm start` for production
- Added Node.js engine specifications

## Environment Variables Required

Set these environment variables in your deployment platform:

```bash
MONGODB_URI=your_mongodb_connection_string
RAPIDAPI_KEY=your_rapidapi_key_for_football_data
```

## Deployment Options

### 1. Heroku (Recommended)

1. **Install Heroku CLI** (if not already installed)
2. **Login to Heroku**:

   ```bash
   heroku login
   ```

3. **Create Heroku app**:

   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**:

   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set RAPIDAPI_KEY=your_rapidapi_key
   ```

5. **Deploy**:

   ```bash
   git add .
   git commit -m "Fix deployment issues"
   git push heroku main
   ```

6. **Open the app**:
   ```bash
   heroku open
   ```

### 2. Vercel

1. **Connect your GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard:
   - `MONGODB_URI`
   - `RAPIDAPI_KEY`
3. **Deploy** - Vercel will automatically deploy on push

### 3. Railway

1. **Connect your GitHub repository** to Railway
2. **Add environment variables** in Railway dashboard
3. **Deploy** - Railway will automatically deploy on push

## Database Setup

1. **Create a MongoDB database** (MongoDB Atlas recommended)
2. **Get your connection string** and set as `MONGODB_URI`
3. **Seed your database** by calling these endpoints after deployment:
   - `/api/seed/standings` - Seed standings data
   - `/api/seed/players` - Seed players data
   - `/api/seed/fixtures` - Seed fixtures data

## API Setup

1. **Get a RapidAPI key** from [API-Football](https://rapidapi.com/api-sports/api/api-football/)
2. **Set the API key** as `RAPIDAPI_KEY` environment variable

## Troubleshooting

### Build Issues

- Ensure all dependencies are correctly listed in `package.json`
- Check that Node.js version is compatible (>=18.0.0)

### Database Issues

- Verify MongoDB connection string is correct
- Ensure database is accessible from your deployment platform
- Check that environment variables are properly set

### API Issues

- Verify RapidAPI key is valid and has sufficient credits
- Check API rate limits

## Local Testing

Before deploying, test locally:

```bash
npm install
npm run build
npm start
```

Visit `http://localhost:3000` to verify everything works.
