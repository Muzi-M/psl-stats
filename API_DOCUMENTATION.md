# PSL Dashboard - API Documentation

## 📋 **Table of Contents**

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Data Endpoints](#data-endpoints)
4. [Seeding Endpoints](#seeding-endpoints)
5. [Error Handling](#error-handling)
6. [Data Models](#data-models)
7. [Rate Limiting](#rate-limiting)

---

## 🌐 **Overview**

The PSL Dashboard API provides comprehensive football data endpoints for the Premier Soccer League. Built with Next.js API Routes, it integrates with RapidAPI for real-time football data and MongoDB for persistent storage.

### **Base URL**

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### **Content Type**

All endpoints return JSON responses with `Content-Type: application/json`

---

## 🔐 **Authentication**

Currently, the API uses environment-based authentication for external services:

### **Required Environment Variables**

```env
MONGODB_URI=your_mongodb_connection_string
RAPIDAPI_KEY=your_rapidapi_key
```

### **RapidAPI Headers**

```javascript
{
  'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}
```

---

## 📊 **Data Endpoints**

### **GET /api/overview**

Returns comprehensive dashboard overview data including standings, scorers, top-rated players, and fixtures.

**URL**: `/api/overview`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `season` | number | No | 2024 | Season year |

**Example Request**:

```bash
curl -X GET "http://localhost:3000/api/overview?season=2024"
```

**Response**:

```json
{
  "standings": [
    {
      "rank": 1,
      "team": {
        "name": "Mamelodi Sundowns",
        "logo": "https://media.api-sports.io/football/teams/1234.png"
      },
      "points": 45,
      "all": {
        "played": 20,
        "win": 15,
        "draw": 0,
        "lose": 5,
        "goals": {
          "for": 45,
          "against": 20
        }
      },
      "goalsDiff": 25
    }
  ],
  "scorers": [
    {
      "player": {
        "name": "Peter Shalulile",
        "photo": "https://media.api-sports.io/football/players/5678.png"
      },
      "statistics": [
        {
          "goals": {
            "total": 15
          }
        }
      ]
    }
  ],
  "topRated": [
    {
      "player": {
        "name": "Themba Zwane",
        "photo": "https://media.api-sports.io/football/players/9012.png"
      },
      "statistics": [
        {
          "games": {
            "rating": 8.5
          }
        }
      ]
    }
  ],
  "fixtures": [
    {
      "fixture": {
        "date": "2024-12-20T19:30:00+02:00"
      },
      "teams": {
        "home": {
          "name": "Mamelodi Sundowns"
        },
        "away": {
          "name": "Kaizer Chiefs"
        }
      },
      "goals": {
        "home": 2,
        "away": 1
      }
    }
  ]
}
```

**Status Codes**:

- `200`: Success
- `500`: Internal server error

---

### **GET /api/standings**

Returns league standings data for a specific season.

**URL**: `/api/standings`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `season` | number | Yes | - | Season year |

**Example Request**:

```bash
curl -X GET "http://localhost:3000/api/standings?season=2024"
```

**Response**:

```json
[
  {
    "rank": 1,
    "team": {
      "id": 1234,
      "name": "Mamelodi Sundowns",
      "logo": "https://media.api-sports.io/football/teams/1234.png"
    },
    "points": 45,
    "all": {
      "played": 20,
      "win": 15,
      "draw": 0,
      "lose": 5,
      "goals": {
        "for": 45,
        "against": 20
      }
    },
    "goalsDiff": 25
  }
]
```

**Status Codes**:

- `200`: Success
- `400`: Bad request (missing season parameter)
- `500`: Internal server error

---

### **GET /api/players**

Returns player data with optional team filtering.

**URL**: `/api/players`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `season` | number | Yes | - | Season year |
| `team` | string | No | - | Team ID filter |

**Example Request**:

```bash
# All players
curl -X GET "http://localhost:3000/api/players?season=2024"

# Players from specific team
curl -X GET "http://localhost:3000/api/players?season=2024&team=1234"
```

**Response**:

```json
[
  {
    "player": {
      "id": 5678,
      "name": "Peter Shalulile",
      "photo": "https://media.api-sports.io/football/players/5678.png",
      "age": 30
    },
    "statistics": [
      {
        "games": {
          "appearences": 20,
          "position": "Attacker"
        },
        "goals": {
          "total": 15,
          "assists": 8
        }
      }
    ],
    "teamName": "Mamelodi Sundowns"
  }
]
```

**Status Codes**:

- `200`: Success
- `400`: Bad request (missing season parameter)
- `500`: Internal server error

---

### **GET /api/teams**

Returns all teams data for a specific season.

**URL**: `/api/teams`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `season` | number | Yes | - | Season year |

**Example Request**:

```bash
curl -X GET "http://localhost:3000/api/teams?season=2024"
```

**Response**:

```json
[
  {
    "id": 1234,
    "name": "Mamelodi Sundowns",
    "logo": "https://media.api-sports.io/football/teams/1234.png",
    "country": "South Africa"
  }
]
```

**Status Codes**:

- `200`: Success
- `400`: Bad request (missing season parameter)
- `500`: Internal server error

---

### **GET /api/fixtures**

Returns fixture data for a specific season.

**URL**: `/api/fixtures`

**Method**: `GET`

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `season` | number | Yes | - | Season year |

**Example Request**:

```bash
curl -X GET "http://localhost:3000/api/fixtures?season=2024"
```

**Response**:

```json
[
  {
    "fixture": {
      "id": 9876,
      "date": "2024-12-20T19:30:00+02:00",
      "status": "FT"
    },
    "teams": {
      "home": {
        "id": 1234,
        "name": "Mamelodi Sundowns",
        "logo": "https://media.api-sports.io/football/teams/1234.png"
      },
      "away": {
        "id": 5678,
        "name": "Kaizer Chiefs",
        "logo": "https://media.api-sports.io/football/teams/5678.png"
      }
    },
    "goals": {
      "home": 2,
      "away": 1
    }
  }
]
```

**Status Codes**:

- `200`: Success
- `400`: Bad request (missing season parameter)
- `500`: Internal server error

---

## 🌱 **Seeding Endpoints**

### **POST /api/seed/players**

Seeds player data from RapidAPI into the database.

**URL**: `/api/seed/players`

**Method**: `POST`

**Headers**:

```javascript
{
  'Content-Type': 'application/json'
}
```

**Example Request**:

```bash
curl -X POST "http://localhost:3000/api/seed/players"
```

**Response**:

```json
{
  "message": "Players seeded successfully",
  "count": 250
}
```

**Status Codes**:

- `200`: Success
- `500`: Internal server error

---

### **POST /api/seed/standings**

Seeds standings data from RapidAPI into the database.

**URL**: `/api/seed/standings`

**Method**: `POST`

**Headers**:

```javascript
{
  'Content-Type': 'application/json'
}
```

**Example Request**:

```bash
curl -X POST "http://localhost:3000/api/seed/standings"
```

**Response**:

```json
{
  "message": "Standings seeded successfully",
  "count": 16
}
```

**Status Codes**:

- `200`: Success
- `500`: Internal server error

---

### **POST /api/seed/fixtures**

Seeds fixture data from RapidAPI into the database.

**URL**: `/api/seed/fixtures`

**Method**: `POST`

**Headers**:

```javascript
{
  'Content-Type': 'application/json'
}
```

**Example Request**:

```bash
curl -X POST "http://localhost:3000/api/seed/fixtures"
```

**Response**:

```json
{
  "message": "Fixtures seeded successfully",
  "count": 240
}
```

**Status Codes**:

- `200`: Success
- `500`: Internal server error

---

## ⚠️ **Error Handling**

### **Error Response Format**

All error responses follow a consistent format:

```json
{
  "error": "Error message description",
  "status": 500,
  "timestamp": "2024-12-20T10:30:00Z"
}
```

### **Common Error Codes**

- `400`: Bad Request - Invalid parameters
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side error
- `503`: Service Unavailable - External API unavailable

### **Error Handling Examples**

**Missing Required Parameter**:

```json
{
  "error": "Season parameter is required",
  "status": 400,
  "timestamp": "2024-12-20T10:30:00Z"
}
```

**External API Error**:

```json
{
  "error": "Failed to fetch data from RapidAPI",
  "status": 503,
  "timestamp": "2024-12-20T10:30:00Z"
}
```

**Database Error**:

```json
{
  "error": "Database connection failed",
  "status": 500,
  "timestamp": "2024-12-20T10:30:00Z"
}
```

---

## 📊 **Data Models**

### **Player Model**

```typescript
interface Player {
  player: {
    id: number;
    name: string;
    photo: string;
    age: number;
  };
  statistics: [
    {
      games: {
        appearences: number;
        position: string;
      };
      goals: {
        total: number;
        assists: number;
      };
    }
  ];
  teamName: string;
}
```

### **Team Model**

```typescript
interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
}
```

### **Standing Model**

```typescript
interface Standing {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  goalsDiff: number;
}
```

### **Fixture Model**

```typescript
interface Fixture {
  fixture: {
    id: number;
    date: string;
    status: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };
}
```

---

## 🚦 **Rate Limiting**

### **RapidAPI Limits**

- **Free Tier**: 100 requests per day
- **Pro Tier**: 1000 requests per day
- **Ultra Tier**: 10,000 requests per day

### **Implementation**

The API implements caching to minimize RapidAPI calls:

```javascript
// Cache duration (in milliseconds)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Check cache before making API calls
const cachedData = await getCachedData(key);
if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
  return cachedData.data;
}
```

### **Cache Strategy**

- **Standings**: Cached for 5 minutes
- **Players**: Cached for 10 minutes
- **Fixtures**: Cached for 15 minutes
- **Teams**: Cached for 1 hour

---

## 🔧 **Implementation Details**

### **Database Connection**

```typescript
// src/lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```

### **API Route Structure**

```typescript
// Example: src/app/api/standings/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const season = searchParams.get("season");

    if (!season) {
      return NextResponse.json(
        { error: "Season parameter is required" },
        { status: 400 }
      );
    }

    // Fetch data from database or RapidAPI
    const standings = await fetchStandings(season);

    return NextResponse.json(standings);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
```

### **Data Fetching Pattern**

```typescript
async function fetchData(endpoint: string, params: Record<string, string>) {
  const url = new URL(endpoint, "https://api-football-v1.p.rapidapi.com");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
```

---

## 📝 **API Versioning**

### **Current Version**: v1

All endpoints are currently version 1. Future versions will be implemented with URL versioning:

```
/api/v1/standings
/api/v2/standings
```

### **Backward Compatibility**

- Version 1 endpoints will remain supported
- New features will be added to newer versions
- Deprecation notices will be provided in advance

---

## 🔍 **Testing**

### **Testing Endpoints**

```bash
# Test overview endpoint
curl -X GET "http://localhost:3000/api/overview?season=2024"

# Test standings endpoint
curl -X GET "http://localhost:3000/api/standings?season=2024"

# Test players endpoint
curl -X GET "http://localhost:3000/api/players?season=2024"

# Test seeding endpoints
curl -X POST "http://localhost:3000/api/seed/players"
curl -X POST "http://localhost:3000/api/seed/standings"
curl -X POST "http://localhost:3000/api/seed/fixtures"
```

### **Health Check**

```bash
# Check API health
curl -X GET "http://localhost:3000/api/health"
```

---

## 📚 **Additional Resources**

### **External APIs**

- [RapidAPI Football API](https://rapidapi.com/api-sports/api/api-football/)
- [API Documentation](https://www.api-football.com/documentation-v3)

### **Database**

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### **Next.js API Routes**

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
