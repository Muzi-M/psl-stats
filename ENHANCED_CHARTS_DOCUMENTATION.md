# Enhanced Charts Documentation

## Overview

The PSL Dashboard now includes a comprehensive suite of enhanced chart components that provide rich data visualization across all sections of the application. These charts are built using Recharts and are designed to be responsive, interactive, and theme-aware.

## Chart Components

### 1. Team Performance Chart

**Location**: `src/components/ui/enhanced-charts.tsx`

**Component**: `TeamPerformanceChart`

**Purpose**: Visualizes team performance metrics including points, wins, draws, losses, and goal difference.

**Usage**:

```tsx
<TeamPerformanceChart
  data={teamData}
  title="Team Performance Overview"
  height={350}
/>
```

**Data Structure**:

```typescript
interface TeamPerformanceData {
  team: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}
```

**Features**:

- Bar chart visualization
- Color-coded metrics (points, wins, draws, losses)
- Interactive tooltips
- Responsive design
- Theme-aware styling

### 2. Goals Distribution Chart

**Component**: `GoalsDistributionChart`

**Purpose**: Shows the distribution of goals scored by top players in a pie chart format.

**Usage**:

```tsx
<GoalsDistributionChart
  data={scorerData}
  title="Goals Distribution"
  height={350}
/>
```

**Data Structure**:

```typescript
interface GoalsDistributionData {
  player: string;
  team: string;
  goals: number;
}
```

**Features**:

- Pie chart visualization
- Percentage labels
- Color-coded segments
- Interactive tooltips
- Legend display

### 3. Season Progress Chart

**Component**: `SeasonProgressChart`

**Purpose**: Tracks team performance progression throughout the season using line charts.

**Usage**:

```tsx
<SeasonProgressChart data={progressData} title="Season Progress" height={400} />
```

**Data Structure**:

```typescript
interface SeasonProgressData {
  matchday: number;
  team: string;
  points: number;
  position: number;
}
```

**Features**:

- Multi-line chart
- Team progression tracking
- Interactive legend
- Responsive design
- Color-coded team lines

### 4. Match Results Chart

**Component**: `MatchResultsChart`

**Purpose**: Visualizes match results and goal patterns using area charts.

**Usage**:

```tsx
<MatchResultsChart data={matchData} title="Recent Match Results" height={300} />
```

**Data Structure**:

```typescript
interface MatchResultsData {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}
```

**Features**:

- Area chart visualization
- Home vs Away goal comparison
- Total goals tracking
- Date-based x-axis
- Multiple data series

### 5. Player Statistics Comparison Chart

**Component**: `PlayerStatsComparisonChart`

**Purpose**: Compares player statistics across multiple metrics using bar charts.

**Usage**:

```tsx
<PlayerStatsComparisonChart
  data={playerData}
  title="Player Statistics Comparison"
  height={400}
/>
```

**Data Structure**:

```typescript
interface PlayerStatsData {
  player: string;
  team: string;
  goals: number;
  assists: number;
  appearances: number;
  rating: number;
}
```

**Features**:

- Multi-bar chart
- Player comparison
- Multiple statistics
- Color-coded metrics
- Interactive tooltips

### 6. Team Form Trend Chart

**Component**: `TeamFormTrendChart`

**Purpose**: Shows team form based on recent match results.

**Usage**:

```tsx
<TeamFormTrendChart data={formData} title="Team Form Trend" height={300} />
```

**Data Structure**:

```typescript
interface TeamFormData {
  team: string;
  lastMatches: Array<{
    result: "W" | "D" | "L";
    opponent: string;
    score: string;
  }>;
}
```

**Features**:

- Form points calculation
- Recent match analysis
- Bar chart visualization
- Interactive tooltips

## Integration Points

### Overview Dashboard

**Enhanced Charts Added**:

- Team Performance Chart
- Goals Distribution Chart
- Match Results Chart

**Location**: `src/components/OverviewDashboard.tsx`

**Implementation**:

```tsx
// Enhanced Charts Section
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <TeamPerformanceChart data={teamData} />
  <GoalsDistributionChart data={scorerData} />
</div>

// Match Results Chart
<MatchResultsChart data={fixtureData} />
```

### Standings Page

**Enhanced Charts Added**:

- Team Performance Chart
- Team Form Trend Chart

**Location**: `src/components/StandingsTable.tsx`

**Implementation**:

```tsx
// Enhanced Charts Section
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <TeamPerformanceChart data={standingsData} />
  <TeamFormTrendChart data={formData} />
</div>
```

### Fixtures Page

**Enhanced Charts Added**:

- Match Results Chart

**Location**: `src/components/FixtureGrid.tsx`

**Implementation**:

```tsx
// Match Results Chart
<MatchResultsChart
  data={filteredFixtures}
  title="Fixture Results Analysis"
  height={350}
/>
```

### Team Dashboard

**Enhanced Charts Added**:

- Player Statistics Comparison Chart

**Location**: `src/components/TeamDashboard.tsx`

**Implementation**:

```tsx
// Player Statistics Chart
<PlayerStatsComparisonChart
  data={teamPlayers}
  title="Team Player Statistics"
  height={350}
/>
```

### Player Pages

**Enhanced Charts Added**:

- Radar Charts (Individual and Comparison)

**Location**: `src/components/ui/radar-chart.tsx`

**Implementation**:

```tsx
// Individual player radar chart
<PlayerRadarChart data={playerData} />

// Player comparison radar chart
<PlayerComparisonRadarChart data={comparisonData} />
```

## Styling and Theming

### Color Scheme

**Primary Colors**:

- Primary: `hsl(var(--primary))`
- Secondary: `hsl(var(--secondary))`
- Accent: `hsl(var(--accent))`

**Metric Colors**:

- Goals: `#ef4444` (red)
- Assists: `#3b82f6` (blue)
- Appearances: `#10b981` (green)
- Rating: `#f59e0b` (amber)
- Wins: `#10b981` (green)
- Draws: `#f59e0b` (amber)
- Losses: `#ef4444` (red)

### Responsive Design

**Breakpoints**:

- Mobile: Single column layout
- Tablet: Two-column grid
- Desktop: Full-width charts with optimal spacing

**Chart Heights**:

- Small: 250px
- Medium: 350px
- Large: 400px

### Theme Support

**Dark/Light Mode**:

- Automatic theme detection
- CSS custom properties
- Consistent color schemes
- High contrast support

## Performance Considerations

### Data Processing

**Optimization Features**:

- Efficient data filtering
- Memoized calculations
- Lazy loading
- Conditional rendering

**Best Practices**:

- Limit data points for large datasets
- Use appropriate chart types
- Implement loading states
- Error handling

### Rendering Performance

**Optimization Techniques**:

- ResponsiveContainer for automatic resizing
- Debounced updates
- Efficient re-renders
- Memory management

## Accessibility Features

### Screen Reader Support

**ARIA Labels**:

- Proper chart labeling
- Data point descriptions
- Interactive element identification

**Keyboard Navigation**:

- Tab navigation
- Focus indicators
- Keyboard shortcuts

### Visual Accessibility

**Color Blindness Support**:

- Multiple color schemes
- Pattern differentiation
- High contrast mode

**Font Scaling**:

- Responsive text sizing
- Readable font sizes
- Proper contrast ratios

## Usage Examples

### Basic Implementation

```tsx
import { TeamPerformanceChart } from "@/components/ui/enhanced-charts";

function MyComponent() {
  const teamData = [
    {
      team: "Team A",
      points: 45,
      wins: 12,
      draws: 9,
      losses: 5,
      goalsFor: 35,
      goalsAgainst: 20,
    },
    // ... more teams
  ];

  return (
    <TeamPerformanceChart
      data={teamData}
      title="League Performance"
      height={400}
    />
  );
}
```

### Advanced Implementation

```tsx
import {
  TeamPerformanceChart,
  GoalsDistributionChart,
  MatchResultsChart,
} from "@/components/ui/enhanced-charts";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Team Performance */}
      <TeamPerformanceChart data={teamData} />

      {/* Goals Distribution */}
      <GoalsDistributionChart data={scorerData} />

      {/* Match Results */}
      <MatchResultsChart data={fixtureData} />
    </div>
  );
}
```

## Troubleshooting

### Common Issues

**Charts Not Rendering**:

- Check data structure
- Verify component imports
- Ensure responsive container
- Check console errors

**Performance Issues**:

- Limit data points
- Use appropriate chart types
- Implement loading states
- Optimize data processing

**Styling Issues**:

- Verify theme variables
- Check CSS custom properties
- Ensure responsive design
- Validate color schemes

### Debug Mode

Enable debug mode for additional logging:

```bash
NEXT_PUBLIC_DEBUG_CHARTS=true
```

## Future Enhancements

### Planned Features

1. **Interactive Filters**: Real-time data filtering
2. **Export Functionality**: Save charts as images/PDFs
3. **Advanced Animations**: Smooth transitions and effects
4. **Real-time Updates**: Live data streaming
5. **Custom Chart Types**: User-defined visualizations

### Technical Improvements

1. **WebGL Rendering**: For large datasets
2. **Virtual Scrolling**: For long lists
3. **Caching**: Improved performance
4. **Offline Support**: Local data storage

---

_This documentation is part of the PSL Dashboard project. For more information, see the main README.md file._
