# PSL Dashboard - Component Documentation

## 📋 **Table of Contents**

1. [Core Components](#core-components)
2. [UI Components](#ui-components)
3. [Animation Components](#animation-components)
4. [Context Providers](#context-providers)
5. [Utility Components](#utility-components)
6. [Page Components](#page-components)

---

## 🎯 **Core Components**

### **AppContent.tsx**

**Purpose**: Main layout wrapper providing application structure with responsive sidebar navigation.

**Location**: `src/components/AppContent.tsx`

**Props**:

```typescript
interface AppContentProps {
  children: React.ReactNode;
}
```

**Features**:

- Mobile hamburger menu with slide-out sidebar
- Responsive layout with collapsible navigation
- Overlay backdrop for mobile interactions
- 3D animation effects on hover
- Auto-close sidebar on mobile navigation

**Usage**:

```tsx
import AppContent from "@/components/AppContent";

export default function Layout({ children }) {
  return <AppContent>{children}</AppContent>;
}
```

**Implementation Details**:

- Uses `useState` for sidebar open/close state
- Implements responsive breakpoints with Tailwind CSS
- Includes smooth transitions and transforms
- Handles mobile touch interactions

---

### **Sidebar.tsx**

**Purpose**: Navigation sidebar with team selection, season toggle, and theme switching.

**Location**: `src/components/Sidebar.tsx`

**Props**:

```typescript
interface SidebarProps {
  onClose?: () => void;
}
```

**Features**:

- Collapsible mobile navigation
- Active route highlighting with 3D effects
- Theme toggle (dark/light mode)
- 3D hover animations
- Auto-close on mobile navigation
- Responsive typography

**Usage**:

```tsx
import Sidebar from "@/components/Sidebar";

<Sidebar onClose={() => setSidebarOpen(false)} />;
```

**Navigation Links**:

- Overview (`/`)
- Standings (`/standings`)
- Fixtures (`/fixtures`)
- Players (`/players`)
- Teams (`/teams`)

---

### **OverviewDashboard.tsx**

**Purpose**: Main dashboard displaying key metrics, top teams, recent fixtures, and player statistics.

**Location**: `src/components/OverviewDashboard.tsx`

**Props**: None (uses context for data)

**Features**:

- Top 5 teams display with logos and points
- Recent fixtures list with scores
- Top scorers chart visualization
- Top rated players chart
- Responsive grid layout
- 3D card animations
- Loading states

**Data Sources**:

- `/api/overview` endpoint
- Uses `useAppContext` for season data
- Implements loading states with `useLoading`

**Usage**:

```tsx
import OverviewDashboard from "@/components/OverviewDashboard";

export default function HomePage() {
  return <OverviewDashboard />;
}
```

---

### **PlayerGrid.tsx**

**Purpose**: Grid display of players with search, filtering, and detailed statistics.

**Location**: `src/components/PlayerGrid.tsx`

**Props**: None (uses context for data)

**Features**:

- Team-based player filtering
- Search functionality with debouncing
- Player statistics display
- Responsive card layout
- 3D hover effects
- Player modal integration
- Image optimization with Next.js Image

**State Management**:

```typescript
const [players, setPlayers] = useState<Player[]>([]);
const [filtered, setFiltered] = useState<Player[]>([]);
const [search, setSearch] = useState("");
const [team, setTeam] = useState("");
const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
```

**Usage**:

```tsx
import PlayerGrid from "@/components/PlayerGrid";

export default function PlayersPage() {
  return <PlayerGrid />;
}
```

---

### **StandingsTable.tsx**

**Purpose**: League standings display with both desktop table and mobile card layouts.

**Location**: `src/components/StandingsTable.tsx`

**Props**: None (uses context for data)

**Features**:

- Full standings table for desktop
- Mobile-optimized card layout
- Team logos and statistics
- Responsive design
- 3D hover animations
- Loading states

**Data Structure**:

```typescript
interface Standing {
  rank: number;
  team: {
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

**Usage**:

```tsx
import StandingsTable from "@/components/StandingsTable";

export default function StandingsPage() {
  return <StandingsTable />;
}
```

---

## 🎨 **UI Components**

### **Button.tsx**

**Purpose**: Enhanced button component with 3D animations and multiple variants.

**Location**: `src/components/ui/button.tsx`

**Props**:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

**Variants**:

- `default`: Primary button with hover lift effect
- `destructive`: Error/danger button
- `outline`: Bordered button
- `secondary`: Secondary action button
- `ghost`: Minimal button
- `link`: Link-style button

**Sizes**:

- `default`: Standard size (h-10 px-4 py-2)
- `sm`: Small button (h-9 px-3)
- `lg`: Large button (h-11 px-8)
- `icon`: Square icon button (h-10 w-10)

**Usage**:

```tsx
import { Button } from '@/components/ui/button';

// Default button
<Button>Click me</Button>

// Destructive button
<Button variant="destructive">Delete</Button>

// Outline button
<Button variant="outline">Cancel</Button>

// Link button
<Button variant="link" asChild>
  <Link href="/about">About</Link>
</Button>
```

**Animation Features**:

- Hover lift effect (`hover:-translate-y-0.5`)
- Active press effect (`active:scale-95`)
- Enhanced shadows (`hover:shadow-lg`)
- Smooth transitions (`transition-all duration-200`)

---

### **Card.tsx**

**Purpose**: Card component with 3D hover effects and flexible content areas.

**Location**: `src/components/ui/card.tsx`

**Sub-components**:

- `CardHeader`: Card title and description
- `CardContent`: Main content area
- `CardFooter`: Bottom action area
- `CardTitle`: Card heading
- `CardDescription`: Card subtitle

**Props**:

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Usage**:

```tsx
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>;
```

**Animation Features**:

- 3D lift on hover (`hover:scale-[1.02] hover:-translate-y-1`)
- Enhanced shadows (`hover:shadow-xl`)
- Smooth transitions (`transition-all duration-300`)
- Hardware acceleration (`transform-gpu`)

---

### **Table.tsx**

**Purpose**: Reusable table component with responsive design.

**Location**: `src/components/Table.tsx`

**Sub-components**:

- `TableHeader`: Table header section
- `TableBody`: Table body section
- `TableFooter`: Table footer section
- `TableRow`: Table row
- `TableCell`: Table cell
- `TableHead`: Header cell
- `TableCaption`: Table caption

**Usage**:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/Table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Position</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Forward</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

---

## ✨ **Animation Components**

### **FloatingAnimation.tsx**

**Purpose**: Collection of 3D animation components for enhanced user experience.

**Location**: `src/components/ui/floating-animation.tsx`

#### **FloatingAnimation**

**Props**:

```typescript
interface FloatingAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}
```

**Usage**:

```tsx
import { FloatingAnimation } from "@/components/ui/floating-animation";

<FloatingAnimation duration={3000} delay={500} direction="up">
  <Card>Floating content</Card>
</FloatingAnimation>;
```

#### **FloatingCard**

**Props**:

```typescript
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage**:

```tsx
import { FloatingCard } from "@/components/ui/floating-animation";

<FloatingCard>
  <Card>Floating card content</Card>
</FloatingCard>;
```

#### **GlowEffect**

**Props**:

```typescript
interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage**:

```tsx
import { GlowEffect } from "@/components/ui/floating-animation";

<GlowEffect>
  <Button>Glowing button</Button>
</GlowEffect>;
```

#### **ParticleBackground**

**Purpose**: Animated background particles for visual enhancement.

**Props**: None

**Usage**:

```tsx
import { ParticleBackground } from "@/components/ui/floating-animation";

// Add to layout
<ParticleBackground />;
```

**Features**:

- 20 animated particles
- Random positioning
- Varying animation delays
- Non-intrusive background effect

---

## 🔄 **Context Providers**

### **AppContext.tsx**

**Purpose**: Global application state management.

**Location**: `src/context/AppContext.tsx`

**State**:

```typescript
interface AppContextType {
  season: number;
  setSeason: (season: number) => void;
}
```

**Usage**:

```tsx
import { useAppContext } from "@/context/AppContext";

function MyComponent() {
  const { season, setSeason } = useAppContext();

  return (
    <div>
      <p>Current season: {season}</p>
      <button onClick={() => setSeason(2025)}>Change to 2025</button>
    </div>
  );
}
```

### **LoadingContext.tsx**

**Purpose**: Global loading state management.

**Location**: `src/context/LoadingContext.tsx`

**State**:

```typescript
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
}
```

**Usage**:

```tsx
import { useLoading } from "@/context/LoadingContext";

function MyComponent() {
  const { setIsLoading, setLoadingMessage } = useLoading();

  const fetchData = async () => {
    setIsLoading(true);
    setLoadingMessage("Loading data...");
    // ... fetch data
    setIsLoading(false);
  };
}
```

---

## 🛠 **Utility Components**

### **LoadingSpinner.tsx**

**Purpose**: Loading indicator component.

**Location**: `src/components/LoadingSpinner.tsx`

**Props**:

```typescript
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Usage**:

```tsx
import LoadingSpinner from "@/components/LoadingSpinner";

<LoadingSpinner size="lg" />;
```

### **SearchBar.tsx**

**Purpose**: Search input component with debouncing.

**Location**: `src/components/SearchBar.tsx`

**Props**:

```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}
```

**Usage**:

```tsx
import SearchBar from "@/components/SearchBar";

<SearchBar
  placeholder="Search players..."
  onSearch={(query) => setSearchQuery(query)}
/>;
```

### **SeasonToggle.tsx**

**Purpose**: Season selection component.

**Location**: `src/components/SeasonToggle.tsx`

**Props**: None (uses context)

**Usage**:

```tsx
import SeasonToggle from "@/components/SeasonToggle";

<SeasonToggle />;
```

### **TeamFilter.tsx**

**Purpose**: Team selection filter component.

**Location**: `src/components/TeamFilter.tsx`

**Props**:

```typescript
interface TeamFilterProps {
  value: string;
  onChange: (team: string) => void;
}
```

**Usage**:

```tsx
import TeamFilter from "@/components/TeamFilter";

<TeamFilter value={selectedTeam} onChange={setSelectedTeam} />;
```

---

## 📄 **Page Components**

### **page.tsx (Home)**

**Purpose**: Home page with overview dashboard.

**Location**: `src/app/page.tsx`

**Features**:

- Overview dashboard
- Season toggle
- Responsive layout

### **standings/page.tsx**

**Purpose**: Standings page with league table.

**Location**: `src/app/standings/page.tsx`

**Features**:

- Standings table
- Season toggle
- Responsive layout

### **players/page.tsx**

**Purpose**: Players page with grid and filtering.

**Location**: `src/app/players/page.tsx`

**Features**:

- Player grid
- Team filter
- Search functionality
- Season toggle

### **teams/page.tsx**

**Purpose**: Teams page with team analytics.

**Location**: `src/app/teams/page.tsx`

**Features**:

- Team dashboard
- Team selection
- Season toggle

### **fixtures/page.tsx**

**Purpose**: Fixtures page with match data.

**Location**: `src/app/fixtures/page.tsx`

**Features**:

- Fixture grid
- Season toggle
- Match details

---

## 🎨 **Styling and Animation**

### **Tailwind CSS Classes**

**Common Animation Classes**:

```css
/* 3D Transform Effects */
transform-gpu                    /* Hardware acceleration */
hover:scale-[1.02]              /* Hover scale */
hover:-translate-y-1            /* Hover lift */
active:scale-95                 /* Active press */

/* Transitions */
transition-all duration-300     /* Smooth transitions */
ease-out                        /* Natural easing */

/* Shadows */
hover:shadow-xl                 /* Enhanced shadows */
shadow-lg                       /* Large shadows */

/* Responsive Design */
sm:grid-cols-2                 /* Small screens */
lg:grid-cols-3                 /* Large screens */
```

### **Custom Animations**

**Keyframe Definitions** (in `tailwind.config.ts`):

```css
@keyframes float-card {
  0%,
  100% {
    transform: translateY(0px) rotateX(0deg) rotateY(0deg);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(-5px) rotateX(2deg) rotateY(1deg);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}
```

---

## 🔧 **Component Development Guidelines**

### **Best Practices**

1. **TypeScript**: Always use TypeScript for type safety
2. **Props Interface**: Define clear prop interfaces
3. **Default Props**: Provide sensible defaults
4. **Error Handling**: Implement proper error boundaries
5. **Loading States**: Include loading indicators
6. **Accessibility**: Follow ARIA guidelines
7. **Responsive Design**: Mobile-first approach
8. **Performance**: Optimize for performance

### **Component Structure**

```tsx
// 1. Imports
import React from "react";
import { cn } from "@/lib/utils";

// 2. Props Interface
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  // ... other props
}

// 3. Component Definition
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, className, ...props }, ref) => {
    // 4. Component Logic
    return (
      // 5. JSX with proper className handling
      <div ref={ref} className={cn("base-classes", className)} {...props}>
        {children}
      </div>
    );
  }
);

// 6. Display Name
Component.displayName = "Component";

// 7. Export
export { Component };
```

### **Testing Guidelines**

1. **Unit Tests**: Test component logic
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Test ARIA compliance
4. **Visual Tests**: Test responsive design
5. **Performance Tests**: Test animation performance

---

## 📝 **Documentation Maintenance**

### **When to Update Documentation**

- New components added
- Props interfaces changed
- New features implemented
- Breaking changes made
- Performance optimizations
- Bug fixes affecting behavior

### **Documentation Standards**

1. **Clear Descriptions**: Explain purpose and functionality
2. **Code Examples**: Provide usage examples
3. **Props Documentation**: Document all props and types
4. **Implementation Details**: Include important implementation notes
5. **Best Practices**: Include usage guidelines
6. **Version Information**: Track changes and versions

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
