# Sentiment Analysis Dashboard - Project Structure

```
sentiment-dashboard/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       │   ├── logo.svg
│       │   └── icons/
│       └── fonts/
│           ├── ClashDisplay-Variable.woff2
│           └── GeneralSans-Variable.woff2
│
├── src/
│   ├── index.tsx                      # Entry point
│   ├── App.tsx                        # Main app component
│   │
│   ├── components/                    # Reusable components
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Container.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── SentimentGauge.tsx
│   │   │   ├── VolumeTimeline.tsx
│   │   │   ├── TopicBubbles.tsx
│   │   │   ├── GeographicHeatmap.tsx
│   │   │   ├── SentimentDonut.tsx
│   │   │   ├── EmotionRadar.tsx
│   │   │   ├── TrendLine.tsx
│   │   │   └── NetworkGraph.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── AlertCard.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── InfluencerCard.tsx
│   │   │   └── TopicCard.tsx
│   │   │
│   │   ├── widgets/
│   │   │   ├── LiveFeed.tsx
│   │   │   ├── TrendingKeywords.tsx
│   │   │   ├── RiskMeter.tsx
│   │   │   ├── AlertTimeline.tsx
│   │   │   └── ComparisonTable.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── EmptyState.tsx
│   │       └── NotificationToast.tsx
│   │
│   ├── pages/                         # Page components
│   │   ├── Dashboard/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── RealTimeMonitoring.tsx
│   │   │       ├── QuickStats.tsx
│   │   │       └── RecentAlerts.tsx
│   │   │
│   │   ├── TopicDiscovery/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── TopicClusters.tsx
│   │   │       ├── TrendingHashtags.tsx
│   │   │       └── TopicEvolution.tsx
│   │   │
│   │   ├── SentimentAnalysis/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── SentimentOverview.tsx
│   │   │       ├── AspectAnalysis.tsx
│   │   │       └── TopPosts.tsx
│   │   │
│   │   ├── EscalationMonitoring/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── RiskDashboard.tsx
│   │   │       ├── EscalationHistory.tsx
│   │   │       ├── PredictionGraph.tsx
│   │   │       └── FactorsBreakdown.tsx
│   │   │
│   │   ├── InfluencerAnalysis/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── TopInfluencers.tsx
│   │   │       ├── InfluencerNetwork.tsx
│   │   │       └── ReachEstimation.tsx
│   │   │
│   │   ├── ComparativeAnalysis/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── MultiTopicComparison.tsx
│   │   │       ├── CompetitorAnalysis.tsx
│   │   │       └── BenchmarkChart.tsx
│   │   │
│   │   ├── Reports/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── ReportBuilder.tsx
│   │   │       ├── ScheduledReports.tsx
│   │   │       └── ExportOptions.tsx
│   │   │
│   │   └── Settings/
│   │       ├── index.tsx
│   │       └── components/
│   │           ├── AlertConfiguration.tsx
│   │           ├── DataSources.tsx
│   │           └── UserPreferences.tsx
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useRealTimeData.ts
│   │   ├── useSentimentAnalysis.ts
│   │   ├── useWebSocket.ts
│   │   ├── useChartData.ts
│   │   ├── useFilters.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useIntersectionObserver.ts
│   │
│   ├── services/                      # API services
│   │   ├── api.ts                     # Axios instance
│   │   ├── sentimentService.ts
│   │   ├── topicService.ts
│   │   ├── escalationService.ts
│   │   ├── influencerService.ts
│   │   ├── reportService.ts
│   │   └── websocketService.ts
│   │
│   ├── store/                         # State management (Zustand)
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── dashboardSlice.ts
│   │   │   ├── sentimentSlice.ts
│   │   │   ├── topicSlice.ts
│   │   │   ├── alertSlice.ts
│   │   │   ├── filterSlice.ts
│   │   │   └── userSlice.ts
│   │   └── middleware/
│   │       └── logger.ts
│   │
│   ├── utils/                         # Utility functions
│   │   ├── formatters.ts              # Date, number formatting
│   │   ├── chartHelpers.ts            # Chart data transformation
│   │   ├── sentimentUtils.ts          # Sentiment color, labels
│   │   ├── validators.ts              # Form validation
│   │   ├── constants.ts               # App constants
│   │   └── calculations.ts            # Math calculations
│   │
│   ├── types/                         # TypeScript types
│   │   ├── index.ts
│   │   ├── sentiment.types.ts
│   │   ├── topic.types.ts
│   │   ├── escalation.types.ts
│   │   ├── influencer.types.ts
│   │   ├── chart.types.ts
│   │   └── api.types.ts
│   │
│   ├── styles/                        # Global styles
│   │   ├── globals.css
│   │   ├── variables.css              # CSS custom properties
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   │
│   ├── config/                        # Configuration files
│   │   ├── routes.ts
│   │   ├── navigation.ts
│   │   └── chartDefaults.ts
│   │
│   └── assets/                        # Static assets
│       ├── icons/
│       └── illustrations/
│
├── tests/                             # Test files
│   ├── unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── integration/
│   └── e2e/
│
├── .env.example                       # Environment variables example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts                     # or webpack.config.js
└── README.md
```

## Teknologi Stack yang Digunakan

### Core
- **React 18.x** dengan TypeScript
- **Vite** - Build tool (lebih cepat dari CRA)
- **Zustand** - State management (lebih simple dari Redux)

### UI & Styling
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations
- **CSS Modules** (optional) - Component-scoped styling

### Charts & Visualization
- **Recharts** - React chart library
- **D3.js** - Custom visualizations
- **React-Map-GL** - Geographic visualization
- **React-Force-Graph** - Network graphs

### Utilities
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **React-Query** - Server state management
- **Socket.io-client** - WebSocket connections
- **React-Hook-Form** - Form handling
- **Zod** - Schema validation

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Cypress** - E2E testing
- **Storybook** - Component documentation

## File Descriptions

### Key Files
- **src/index.tsx**: Application entry point, provider setup
- **src/App.tsx**: Main routing, layout structure
- **src/components/layout/MainLayout.tsx**: Dashboard shell (sidebar + header + content)
- **src/store/index.ts**: Zustand store configuration
- **src/services/api.ts**: Axios configuration, interceptors
- **src/styles/globals.css**: Global styles, resets, Tailwind imports

### Component Organization
- **components/layout**: Structural components
- **components/charts**: All chart/visualization components
- **components/cards**: Card-style components for metrics
- **components/widgets**: Complex composite components
- **components/ui**: Basic UI primitives (buttons, inputs, etc)
- **pages**: Page-level components with routing

### State Management
- **store/slices**: Zustand slices for different domains
- **hooks**: Custom hooks for reusable logic
- **services**: API call abstractions

### Styling Strategy
- Tailwind for utility classes
- CSS variables for theming
- Framer Motion for animations
- Custom CSS for complex layouts