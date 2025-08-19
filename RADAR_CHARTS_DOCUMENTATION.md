# Radar Charts for Player Data Visualization

## Overview

The PSL Dashboard now includes advanced radar chart functionality to visualize player performance data in an intuitive and interactive format. Radar charts (also known as spider charts) provide a comprehensive view of multiple player statistics on a single chart, making it easy to compare different aspects of player performance.

## Features

### 1. Individual Player Radar Charts

- **Performance Analysis**: Visualize a single player's statistics across multiple dimensions
- **Normalized Data**: All statistics are normalized to a 0-10 scale for fair comparison
- **Interactive Tooltips**: Hover over chart elements to see detailed values
- **Responsive Design**: Charts adapt to different screen sizes

### 2. Player Comparison Radar Charts

- **Multi-Player Comparison**: Compare up to 6 players simultaneously
- **Color-Coded Visualization**: Each player has a distinct color for easy identification
- **Interactive Selection**: Choose which players to compare
- **Legend Display**: Clear legend showing player names and colors

### 3. Team Performance Analytics

- **Team-Wide View**: View radar charts for all players in a selected team
- **Toggle Functionality**: Show/hide radar charts as needed
- **Grid Layout**: Organized display of multiple player charts

## Components

### Core Components

#### `PlayerRadarChart`

```typescript
interface PlayerRadarChartProps {
  data: RadarChartData[];
  playerName: string;
  className?: string;
  height?: number;
}
```

**Features:**

- Displays individual player performance radar chart
- Customizable height and styling
- Automatic data normalization
- Responsive design

#### `PlayerComparisonRadarChart`

```typescript
interface PlayerComparisonRadarChartProps {
  players: Array<{
    name: string;
    stats: any;
    color?: string;
  }>;
  className?: string;
  height?: number;
}
```

**Features:**

- Compares multiple players on the same chart
- Custom color support for each player
- Interactive legend
- Automatic data preparation

#### `PlayerRadarGrid`

```typescript
interface PlayerRadarGridProps {
  players: Player[];
  teamName: string;
}
```

**Features:**

- Grid layout for team player charts
- Toggle between individual and comparison views
- Player selection for comparison
- Show/hide chart functionality

### Data Preparation

#### `preparePlayerRadarData()`

Helper function that transforms raw player statistics into radar chart format:

```typescript
function preparePlayerRadarData(playerStats: any): RadarChartData[];
```

**Normalized Statistics:**

- **Goals**: Goals per game (normalized to 1 goal/game = 10)
- **Assists**: Assists per game (normalized to 1 assist/game = 10)
- **Appearances**: Total appearances (normalized to 38 games = 10)
- **Minutes**: Minutes per appearance (normalized to 90 min/game = 10)
- **Rating**: Player rating (assumed 0-10 scale)
- **Consistency**: Based on regular appearances (8 if plays regularly, 0 otherwise)

## Usage Examples

### 1. Individual Player Page

```tsx
import {
  PlayerRadarChart,
  preparePlayerRadarData,
} from "@/components/ui/radar-chart";

// In player page component
<Card>
  <CardHeader>
    <CardTitle>Performance Analysis</CardTitle>
  </CardHeader>
  <CardContent>
    <PlayerRadarChart
      data={preparePlayerRadarData(playerData)}
      playerName={playerData.player.name}
      height={350}
    />
  </CardContent>
</Card>;
```

### 2. Team Player Grid

```tsx
import PlayerRadarGrid from "@/components/PlayerRadarGrid";

// In team player grid
<PlayerRadarGrid players={filteredPlayers} teamName={teamName} />;
```

### 3. Custom Player Comparison

```tsx
import { PlayerComparisonRadarChart } from "@/components/ui/radar-chart";

const playersToCompare = [
  { name: "Player 1", stats: player1Data, color: "#3b82f6" },
  { name: "Player 2", stats: player2Data, color: "#ef4444" },
];

<PlayerComparisonRadarChart players={playersToCompare} height={400} />;
```

## Data Structure

### Input Data Format

```typescript
interface Player {
  player: {
    name: string;
    photo: string;
    age: number;
  };
  statistics: {
    games: {
      appearences: number;
      position: string;
      minutes: number;
      rating: number;
    };
    goals: {
      total: number;
      assists: number;
    };
    team?: { logo: string };
  }[];
  teamName: string;
}
```

### Radar Chart Data Format

```typescript
interface RadarChartData {
  subject: string; // Statistic name (e.g., "Goals", "Assists")
  value: number; // Normalized value (0-10)
  fullMark?: number; // Maximum possible value
}
```

## Styling and Theming

### Color Scheme

- **Primary Color**: Used for individual player charts
- **Secondary Colors**: Used for comparison charts (automatically assigned)
- **Theme Support**: Adapts to light/dark mode
- **Custom Colors**: Support for custom player colors in comparisons

### Responsive Design

- **Mobile**: Single column layout for charts
- **Tablet**: Two-column grid for individual charts
- **Desktop**: Full-width charts with optimal spacing

## Performance Considerations

### Data Processing

- **Efficient Normalization**: Calculations performed once per data load
- **Memoization**: Chart data cached to prevent unnecessary recalculations
- **Lazy Loading**: Charts only render when visible

### Rendering Optimization

- **ResponsiveContainer**: Automatic chart resizing
- **Debounced Updates**: Smooth interactions during data changes
- **Conditional Rendering**: Charts only render when data is available

## Accessibility Features

### Screen Reader Support

- **ARIA Labels**: Proper labeling for chart elements
- **Keyboard Navigation**: Tab navigation through interactive elements
- **High Contrast**: Support for high contrast mode

### Visual Accessibility

- **Color Blindness**: Multiple color schemes for different types of color blindness
- **Font Scaling**: Charts scale with browser font size settings
- **Focus Indicators**: Clear focus states for interactive elements

## Integration Points

### Existing Components

- **PlayerGrid**: Enhanced with radar chart functionality
- **Player Pages**: Individual player radar charts
- **Team Pages**: Team-wide player comparisons

### API Integration

- **Player Data**: Uses existing `/api/players` endpoint
- **Season Support**: Respects current season selection
- **Team Filtering**: Works with existing team filters

## Future Enhancements

### Planned Features

1. **Historical Data**: Track player performance over multiple seasons
2. **Position-Specific Metrics**: Different metrics for different player positions
3. **Advanced Comparisons**: Statistical significance indicators
4. **Export Functionality**: Save charts as images or PDFs
5. **Custom Metrics**: User-defined performance indicators

### Technical Improvements

1. **WebGL Rendering**: For better performance with large datasets
2. **Real-time Updates**: Live chart updates during matches
3. **Predictive Analytics**: Performance trend predictions
4. **Machine Learning**: Automated player similarity detection

## Troubleshooting

### Common Issues

#### Charts Not Displaying

- **Check Data**: Ensure player statistics are available
- **Validate Format**: Verify data structure matches expected format
- **Console Errors**: Check browser console for JavaScript errors

#### Performance Issues

- **Limit Players**: Reduce number of players in comparison charts
- **Data Filtering**: Filter out players with incomplete data
- **Chart Height**: Reduce chart height for better performance

#### Styling Issues

- **Theme Variables**: Ensure CSS custom properties are defined
- **Responsive Issues**: Check container width and height
- **Color Conflicts**: Verify color scheme compatibility

### Debug Mode

Enable debug mode by setting environment variable:

```bash
NEXT_PUBLIC_DEBUG_CHARTS=true
```

This will show additional console logging for chart rendering and data processing.

## Contributing

### Development Guidelines

1. **TypeScript**: All components use TypeScript for type safety
2. **Testing**: Add unit tests for new chart functionality
3. **Documentation**: Update this documentation for new features
4. **Performance**: Monitor chart rendering performance
5. **Accessibility**: Ensure new features meet accessibility standards

### Code Style

- **Component Structure**: Follow existing component patterns
- **Naming Conventions**: Use descriptive names for props and functions
- **Error Handling**: Implement proper error boundaries
- **Loading States**: Provide loading indicators for data fetching

---

_This documentation is part of the PSL Dashboard project. For more information, see the main README.md file._
