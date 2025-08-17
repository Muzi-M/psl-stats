# PSL Dashboard - Premier Soccer League Analytics Platform

## 🏆 **Overview**

The PSL Dashboard is a modern, responsive web application that provides comprehensive analytics and insights for the Premier Soccer League. Built with Next.js 15, React 19, and TypeScript, it offers real-time data visualization, player statistics, team standings, and fixture management with stunning 3D animations and mobile-responsive design.

## 🚀 **Features**

### **Core Functionality**

- 📊 **Real-time Analytics**: Live standings, player stats, and team performance
- 👥 **Player Management**: Detailed player profiles with statistics and performance metrics
- 🏆 **Team Analytics**: Comprehensive team data and performance tracking
- 📅 **Fixture Management**: Match schedules, results, and upcoming games
- 📱 **Mobile Responsive**: Optimized for all devices with touch-friendly interface
- 🎨 **3D Animations**: Modern UI with smooth animations and visual effects
- 🌙 **Dark/Light Mode**: Theme switching with system preference detection
- ⚡ **Performance Optimized**: Fast loading with hardware-accelerated animations

### **Data Sources**

- **RapidAPI**: Real-time football data integration
- **MongoDB**: Persistent data storage with Mongoose ODM
- **Next.js API Routes**: Server-side data processing and caching

## 🛠 **Technology Stack**

### **Frontend**

- **Next.js 15.3.4**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization library
- **Lucide React**: Modern icon library

### **Backend**

- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database
- **Mongoose 8**: MongoDB object modeling
- **RapidAPI**: External football data API

### **Development Tools**

- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **TypeScript**: Static type checking

## 📁 **Project Structure**

```
psl-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── fixtures/      # Fixture data endpoints
│   │   │   ├── overview/      # Dashboard overview data
│   │   │   ├── players/       # Player data endpoints
│   │   │   ├── seed/          # Data seeding endpoints
│   │   │   ├── standings/     # League standings data
│   │   │   └── teams/         # Team data endpoints
│   │   ├── fixtures/          # Fixtures page
│   │   ├── players/           # Players page
│   │   ├── standings/         # Standings page
│   │   ├── teams/             # Teams page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── button.tsx    # Button component
│   │   │   ├── card.tsx      # Card component
│   │   │   ├── charts.tsx    # Chart components
│   │   │   └── floating-animation.tsx # 3D animation components
│   │   ├── AppContent.tsx    # Main app layout wrapper
│   │   ├── Header.tsx        # Application header
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   ├── OverviewDashboard.tsx # Dashboard overview
│   │   ├── PageLoader.tsx    # Page loading component
│   │   ├── PlayerGrid.tsx    # Player display grid
│   │   ├── PlayerModal.tsx   # Player detail modal
│   │   ├── SearchBar.tsx     # Search functionality
│   │   ├── SeasonToggle.tsx  # Season selection
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── StandingsTable.tsx # League standings
│   │   ├── Table.tsx         # Reusable table component
│   │   ├── TeamCard.tsx      # Team display cards
│   │   ├── TeamDashboard.tsx # Team analytics
│   │   ├── TeamFilter.tsx    # Team filtering
│   │   ├── ThemeProvider.tsx # Theme management
│   │   ├── TopRatedChart.tsx # Top rated players chart
│   │   └── TopScorersChart.tsx # Top scorers chart
│   ├── context/              # React context providers
│   │   ├── AppContext.tsx    # Application state
│   │   └── LoadingContext.tsx # Loading state management
│   ├── lib/                  # Utility libraries
│   │   ├── db.ts            # Database connection
│   │   ├── fetcher.ts       # Data fetching utilities
│   │   └── utils.ts         # General utilities
│   ├── models/              # Data models
│   │   └── Fixture.ts       # Fixture data model
│   ├── styles/              # Additional styles
│   │   └── globals.css      # Global CSS
│   └── types/               # TypeScript type definitions
│       └── lodash.d.ts      # Lodash type extensions
├── public/                  # Static assets
├── .env.local              # Environment variables
├── components.json         # UI component configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 **Component Documentation**

### **Core Components**

#### **AppContent.tsx**

Main layout wrapper that provides the application structure with sidebar navigation and responsive design.

**Features:**

- Mobile hamburger menu with slide-out sidebar
- Responsive layout with collapsible navigation
- Overlay backdrop for mobile interactions
- 3D animation effects on hover

**Props:** `children: React.ReactNode`

#### **Sidebar.tsx**

Navigation sidebar with team selection, season toggle, and theme switching.

**Features:**

- Collapsible mobile navigation
- Active route highlighting
- Theme toggle (dark/light mode)
- 3D hover animations
- Auto-close on mobile navigation

**Props:** `onClose?: () => void`

#### **OverviewDashboard.tsx**

Main dashboard displaying key metrics, top teams, recent fixtures, and player statistics.

**Features:**

- Top 5 teams display
- Recent fixtures list
- Top scorers chart
- Top rated players chart
- Responsive grid layout
- 3D card animations

#### **PlayerGrid.tsx**

Grid display of players with search, filtering, and detailed statistics.

**Features:**

- Team-based player filtering
- Search functionality
- Player statistics display
- Responsive card layout
- 3D hover effects
- Player modal integration

#### **StandingsTable.tsx**

League standings display with both desktop table and mobile card layouts.

**Features:**

- Full standings table for desktop
- Mobile-optimized card layout
- Team logos and statistics
- Responsive design
- 3D hover animations

### **UI Components**

#### **Button.tsx**

Enhanced button component with 3D animations and multiple variants.

**Variants:**

- `default`: Primary button with hover lift effect
- `destructive`: Error/danger button
- `outline`: Bordered button
- `secondary`: Secondary action button
- `ghost`: Minimal button
- `link`: Link-style button

**Sizes:**

- `default`: Standard size
- `sm`: Small button
- `lg`: Large button
- `icon`: Square icon button

#### **Card.tsx**

Card component with 3D hover effects and flexible content areas.

**Sub-components:**

- `CardHeader`: Card title and description
- `CardContent`: Main content area
- `CardFooter`: Bottom action area
- `CardTitle`: Card heading
- `CardDescription`: Card subtitle

#### **Table.tsx**

Reusable table component with responsive design.

**Sub-components:**

- `TableHeader`: Table header section
- `TableBody`: Table body section
- `TableRow`: Table row
- `TableCell`: Table cell
- `TableHead`: Header cell

### **Animation Components**

#### **FloatingAnimation.tsx**

Collection of 3D animation components for enhanced user experience.

**Components:**

- `FloatingAnimation`: Configurable floating animation
- `FloatingCard`: Card with floating effect
- `GlowEffect`: Glowing hover effect
- `ParticleBackground`: Animated background particles

## 🔧 **API Documentation**

### **Data Endpoints**

#### **GET /api/overview**

Returns dashboard overview data including standings, scorers, top-rated players, and fixtures.

**Query Parameters:**

- `season` (number): Season year (default: 2024)

**Response:**

```json
{
  "standings": [...],
  "scorers": [...],
  "topRated": [...],
  "fixtures": [...]
}
```

#### **GET /api/standings**

Returns league standings data.

**Query Parameters:**

- `season` (number): Season year

**Response:**

```json
[
  {
    "rank": 1,
    "team": { "name": "Team Name", "logo": "url" },
    "points": 45,
    "all": {
      "played": 20,
      "win": 15,
      "draw": 0,
      "lose": 5,
      "goals": { "for": 45, "against": 20 }
    },
    "goalsDiff": 25
  }
]
```

#### **GET /api/players**

Returns player data with optional team filtering.

**Query Parameters:**

- `season` (number): Season year
- `team` (string): Team ID filter (optional)

#### **GET /api/teams**

Returns all teams data.

**Query Parameters:**

- `season` (number): Season year

#### **GET /api/fixtures**

Returns fixture data.

**Query Parameters:**

- `season` (number): Season year

### **Data Seeding Endpoints**

#### **POST /api/seed/players**

Seeds player data from RapidAPI.

#### **POST /api/seed/standings**

Seeds standings data from RapidAPI.

#### **POST /api/seed/fixtures**

Seeds fixture data from RapidAPI.

## 🎨 **Design System**

### **Color Palette**

- **Primary**: Blue accent color for interactive elements
- **Secondary**: Gray tones for secondary actions
- **Destructive**: Red for error states and dangerous actions
- **Muted**: Subtle colors for background elements
- **Accent**: Highlight colors for emphasis

### **Typography**

- **Headings**: Bold, large text for titles
- **Body**: Regular weight for content
- **Muted**: Lighter weight for secondary information
- **Responsive**: Scales appropriately across devices

### **Spacing System**

- **4px base unit**: Consistent spacing throughout
- **Responsive spacing**: Adapts to screen size
- **Component padding**: Standardized internal spacing

### **Animation System**

- **Duration**: 200-300ms for responsive feel
- **Easing**: Ease-out for natural movement
- **Hardware acceleration**: GPU-accelerated transforms
- **3D effects**: Depth and perspective animations

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18+
- npm 8+
- MongoDB database
- RapidAPI account with football data access

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
   Create `.env.local` file:

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

### **Available Scripts**

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 📱 **Mobile Responsiveness**

### **Breakpoints**

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Mobile Features**

- Collapsible sidebar navigation
- Touch-friendly interface
- Responsive grid layouts
- Optimized loading states
- Reduced motion support

## 🎭 **3D Animations**

### **Animation Types**

- **Hover Effects**: Cards lift and scale on hover
- **Press Effects**: Buttons scale down when clicked
- **Floating Animations**: Subtle floating movements
- **Glow Effects**: Dynamic shadow animations
- **Particle Background**: Animated background elements

### **Performance Optimizations**

- Hardware-accelerated transforms
- Efficient CSS animations
- Reduced motion support
- Mobile-optimized effects

## 🔒 **Security Considerations**

### **Environment Variables**

- API keys stored in environment variables
- No sensitive data in client-side code
- Secure database connections

### **Data Validation**

- Input validation on API endpoints
- TypeScript type checking
- Error handling and logging

## 🚀 **Deployment**

### **Platforms Supported**

- **Vercel**: Recommended for Next.js applications
- **Railway**: Easy deployment with database integration
- **Render**: Free tier available
- **Netlify**: Static site hosting
- **Heroku**: Traditional hosting platform

### **Environment Variables**

Ensure all required environment variables are set:

- `MONGODB_URI`: Database connection string
- `RAPIDAPI_KEY`: API key for football data

### **Build Process**

```bash
npm run build
npm run start
```

## 📊 **Performance Metrics**

### **Optimization Features**

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized JavaScript bundles
- **Caching**: Efficient caching strategies
- **CDN**: Global content delivery

### **Lighthouse Scores**

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

## 🤝 **Contributing**

### **Development Workflow**

1. Create feature branch
2. Implement changes
3. Update documentation
4. Test thoroughly
5. Submit pull request

### **Code Standards**

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Component documentation
- Test coverage

## 📝 **Documentation Updates**

This documentation should be updated whenever:

- New components are added
- API endpoints are modified
- Configuration changes are made
- New features are implemented
- Dependencies are updated

## 📄 **License**

This project is licensed under the MIT License.

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: Development Team
