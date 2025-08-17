# PSL Dashboard - Development Guide

## 📋 **Table of Contents**

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Code Standards](#code-standards)
4. [Component Development](#component-development)
5. [API Development](#api-development)
6. [Testing](#testing)
7. [Performance](#performance)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control
- **MongoDB** (local or cloud instance)
- **RapidAPI** account with football data access

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd psl-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   RAPIDAPI_KEY=your_rapidapi_key
   ```

4. **Database Setup**

   ```bash
   # Seed initial data
   curl -X POST http://localhost:3000/api/seed/players
   curl -X POST http://localhost:3000/api/seed/standings
   curl -X POST http://localhost:3000/api/seed/fixtures
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠 **Development Environment**

### **Available Scripts**

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### **Development Commands**

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### **IDE Setup**

#### **VS Code Extensions**

Install the following extensions for optimal development experience:

- **TypeScript and JavaScript Language Features**
- **Tailwind CSS IntelliSense**
- **ESLint**
- **Prettier**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

#### **VS Code Settings**

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

---

## 📝 **Code Standards**

### **TypeScript Guidelines**

#### **Type Definitions**

- Always define interfaces for component props
- Use strict TypeScript configuration
- Avoid `any` type - use proper typing
- Export types from dedicated type files

```typescript
// ✅ Good
interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

// ❌ Avoid
const Button = (props: any) => {
  // ...
};
```

#### **Component Structure**

```typescript
// 1. Imports
import React from "react";
import { cn } from "@/lib/utils";

// 2. Props Interface
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

// 3. Component Definition
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-classes", className)} {...props}>
        {children}
      </div>
    );
  }
);

// 4. Display Name
Component.displayName = "Component";

// 5. Export
export { Component };
```

### **React Guidelines**

#### **Hooks Usage**

- Use custom hooks for reusable logic
- Follow React hooks naming conventions
- Implement proper cleanup in useEffect

```typescript
// ✅ Good
const usePlayerData = (season: number) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await fetch(`/api/players?season=${season}`);
        const players = await data.json();
        setPlayers(players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [season]);

  return { players, loading };
};
```

#### **State Management**

- Use React Context for global state
- Keep component state local when possible
- Use proper state update patterns

```typescript
// ✅ Good - Using context
const { season, setSeason } = useAppContext();

// ✅ Good - Local state
const [isOpen, setIsOpen] = useState(false);

// ❌ Avoid - Prop drilling
const Component = ({ season, setSeason, ...props }) => {
  // ...
};
```

### **CSS Guidelines**

#### **Tailwind CSS**

- Use utility classes for styling
- Create custom components for repeated patterns
- Follow responsive design principles

```tsx
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    Action
  </button>
</div>

// ❌ Avoid - Inline styles
<div style={{ display: 'flex', padding: '16px', backgroundColor: 'white' }}>
  {/* ... */}
</div>
```

#### **Responsive Design**

```tsx
// Mobile-first approach
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>

// Responsive text
<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
  Responsive Title
</h1>
```

---

## 🧩 **Component Development**

### **Creating New Components**

1. **Create Component File**

   ```bash
   touch src/components/NewComponent.tsx
   ```

2. **Basic Component Template**

   ```tsx
   "use client";

   import React from "react";
   import { cn } from "@/lib/utils";

   interface NewComponentProps {
     children?: React.ReactNode;
     className?: string;
   }

   const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
     ({ children, className, ...props }, ref) => {
       return (
         <div ref={ref} className={cn("base-styles", className)} {...props}>
           {children}
         </div>
       );
     }
   );

   NewComponent.displayName = "NewComponent";

   export { NewComponent };
   ```

3. **Add to Index File**
   ```tsx
   // src/components/index.ts
   export { NewComponent } from "./NewComponent";
   ```

### **Component Testing**

#### **Unit Tests**

```tsx
// __tests__/NewComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { NewComponent } from "../NewComponent";

describe("NewComponent", () => {
  it("renders correctly", () => {
    render(<NewComponent>Test Content</NewComponent>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<NewComponent className="custom-class">Test</NewComponent>);
    expect(screen.getByText("Test")).toHaveClass("custom-class");
  });
});
```

### **Component Documentation**

Update `COMPONENT_DOCUMENTATION.md` when adding new components:

````markdown
### **NewComponent.tsx**

**Purpose**: Brief description of component purpose.

**Location**: `src/components/NewComponent.tsx`

**Props**:

```typescript
interface NewComponentProps {
  children?: React.ReactNode;
  className?: string;
}
```
````

**Usage**:

```tsx
import { NewComponent } from "@/components/NewComponent";

<NewComponent className="custom-class">Content</NewComponent>;
```

````

---

## 🔌 **API Development**

### **Creating New API Routes**

1. **Create Route File**
   ```bash
   mkdir -p src/app/api/new-endpoint
   touch src/app/api/new-endpoint/route.ts
````

2. **Basic API Route Template**

   ```typescript
   import { NextRequest, NextResponse } from "next/server";
   import dbConnect from "@/lib/db";

   export async function GET(request: NextRequest) {
     try {
       await dbConnect();

       const { searchParams } = new URL(request.url);
       const param = searchParams.get("param");

       if (!param) {
         return NextResponse.json(
           { error: "Parameter is required" },
           { status: 400 }
         );
       }

       // Fetch data
       const data = await fetchData(param);

       return NextResponse.json(data);
     } catch (error) {
       return NextResponse.json(
         { error: (error as Error).message },
         { status: 500 }
       );
     }
   }

   export async function POST(request: NextRequest) {
     try {
       await dbConnect();

       const body = await request.json();

       // Process data
       const result = await processData(body);

       return NextResponse.json(result);
     } catch (error) {
       return NextResponse.json(
         { error: (error as Error).message },
         { status: 500 }
       );
     }
   }
   ```

### **Database Operations**

#### **Mongoose Models**

```typescript
// src/models/NewModel.ts
import mongoose from "mongoose";

const NewModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NewModel ||
  mongoose.model("NewModel", NewModelSchema);
```

#### **Database Operations**

```typescript
// CRUD operations
import NewModel from "@/models/NewModel";

// Create
const newItem = await NewModel.create(data);

// Read
const items = await NewModel.find({});

// Update
const updatedItem = await NewModel.findByIdAndUpdate(id, data, { new: true });

// Delete
await NewModel.findByIdAndDelete(id);
```

### **API Testing**

#### **Manual Testing**

```bash
# Test GET endpoint
curl -X GET "http://localhost:3000/api/new-endpoint?param=value"

# Test POST endpoint
curl -X POST "http://localhost:3000/api/new-endpoint" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

#### **Automated Testing**

```typescript
// __tests__/api/new-endpoint.test.ts
import { createMocks } from "node-mocks-http";
import { GET, POST } from "@/app/api/new-endpoint/route";

describe("/api/new-endpoint", () => {
  it("GET returns 400 for missing parameter", async () => {
    const { req } = createMocks({
      method: "GET",
      url: "/api/new-endpoint",
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Parameter is required");
  });
});
```

---

## 🧪 **Testing**

### **Testing Strategy**

#### **Unit Tests**

- Test individual components and functions
- Mock external dependencies
- Test edge cases and error conditions

#### **Integration Tests**

- Test component interactions
- Test API endpoint integration
- Test data flow between components

#### **E2E Tests**

- Test complete user workflows
- Test responsive design
- Test accessibility features

### **Testing Setup**

#### **Jest Configuration**

```javascript
// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

#### **Testing Library Setup**

```javascript
// jest.setup.js
import "@testing-library/jest-dom";
```

### **Writing Tests**

#### **Component Tests**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByText("Delete")).toHaveClass("bg-destructive");
  });
});
```

#### **API Tests**

```typescript
import { createMocks } from "node-mocks-http";
import { GET } from "@/app/api/standings/route";

describe("/api/standings", () => {
  it("returns standings data", async () => {
    const { req } = createMocks({
      method: "GET",
      url: "/api/standings?season=2024",
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
```

---

## ⚡ **Performance**

### **Performance Optimization**

#### **Code Splitting**

```tsx
// Lazy load components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
```

#### **Image Optimization**

```tsx
import Image from "next/image";

// Optimized image loading
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={300}
  height={200}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;
```

#### **Memoization**

```tsx
import { useMemo, useCallback } from "react";

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

### **Performance Monitoring**

#### **Lighthouse Audits**

```bash
# Run Lighthouse CI
npm install -g lighthouse
lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json
```

#### **Bundle Analysis**

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 🚀 **Deployment**

### **Deployment Platforms**

#### **Vercel (Recommended)**

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### **Railway**

1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

#### **Manual Deployment**

```bash
# Build application
npm run build

# Start production server
npm run start
```

### **Environment Variables**

#### **Production Environment**

```env
MONGODB_URI=your_production_mongodb_uri
RAPIDAPI_KEY=your_rapidapi_key
NODE_ENV=production
```

#### **Staging Environment**

```env
MONGODB_URI=your_staging_mongodb_uri
RAPIDAPI_KEY=your_rapidapi_key
NODE_ENV=staging
```

### **CI/CD Pipeline**

#### **GitHub Actions**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
```

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Build Errors**

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **TypeScript Errors**

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix type issues
npm run type-check
```

#### **Database Connection Issues**

```typescript
// Check MongoDB connection
import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully");
});
```

#### **API Errors**

```typescript
// Add error logging
try {
  const response = await fetch("/api/endpoint");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error("API Error:", error);
  // Handle error appropriately
}
```

### **Debugging Tools**

#### **React Developer Tools**

- Install React Developer Tools browser extension
- Use Profiler for performance analysis
- Inspect component state and props

#### **Network Tab**

- Monitor API requests
- Check response times
- Debug CORS issues

#### **Console Logging**

```typescript
// Add debug logging
const DEBUG = process.env.NODE_ENV === "development";

if (DEBUG) {
  console.log("Debug info:", data);
}
```

---

## 📚 **Additional Resources**

### **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### **Tools**

- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)

### **Best Practices**

- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js Best Practices](https://nextjs.org/docs/basic-features/typescript)

---

## 📝 **Contributing Guidelines**

### **Pull Request Process**

1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Run linting and tests
5. Submit pull request
6. Code review and approval
7. Merge to main

### **Commit Message Format**

```
type(scope): description

feat(components): add new button component
fix(api): resolve database connection issue
docs(readme): update installation instructions
```

### **Code Review Checklist**

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility requirements met

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
