# 📘 Week 4 Capstone Planning

## Project Overview

Build a complete, production-ready API-powered web application. Choose one of three options: Weather Dashboard, Movie Database App, or News Aggregator.

---

## Option A: Weather Dashboard

### API Choice: OpenWeatherMap

**API Key Required:** Yes (free tier available at openweathermap.org)

**Free Tier Limits:**
- 60 calls per minute
- 1,000,000 calls per month
- Current weather and 5-day forecast

### Required Endpoints

| Endpoint | URL | Purpose |
|----------|-----|---------|
| Current Weather | `https://api.openweathermap.org/data/2.5/weather` | Current conditions |
| 5-day Forecast | `https://api.openweathermap.org/data/2.5/forecast` | Daily forecast |

### Data Structure

```javascript
// Current Weather Response
{
    name: "London",
    main: {
        temp: 22.5,
        feels_like: 21.3,
        temp_min: 18.2,
        temp_max: 24.1,
        humidity: 65
    },
    weather: [{
        main: "Clear",
        description: "clear sky",
        icon: "01d"
    }],
    wind: { speed: 5.1 },
    sys: {
        sunrise: 1647123456,
        sunset: 1647167890
    }
}

// Forecast Response
{
    list: [
        {
            dt: 1647123456,
            main: { temp: 22.5, temp_min: 18, temp_max: 24 },
            weather: [{ main: "Clear", icon: "01d" }]
        }
    ]
}
```

### UI Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Weather Dashboard                        │
├─────────────────────────────────────────────────────────────┤
│  [City Search Input]  [Search]  [📍 My Location]            │
│  Recent: London | Paris | Tokyo                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    ☀️ Clear Sky                              │
│                      22°C                                    │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Humidity │ │ Wind     │ │ Feels    │ │ High/Low │       │
│  │ 65%      │ │ 5 km/h   │ │ 21°C     │ │ 24°/18°  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────┤
│                      5-Day Forecast                          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                    │
│  │ Mon │ │ Tue │ │ Wed │ │ Thu │ │ Fri │                    │
│  │ ☀️  │ │ ☁️  │ │ 🌧️  │ │ ☀️  │ │ ☀️  │                    │
│  │ 22° │ │ 20° │ │ 18° │ │ 21° │ │ 23° │                    │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Plan

**Phase 1: HTML Structure (30 min)**
- Create container layout
- Add search section with input and buttons
- Add weather display area
- Add forecast section
- Add recent searches section

**Phase 2: CSS Styling (45 min)**
- Style container and cards
- Create gradient backgrounds for weather conditions
- Make responsive with media queries
- Add animations for loading states

**Phase 3: JavaScript - Core (45 min)**
- Implement fetch for current weather
- Implement fetch for forecast
- Display data on page
- Add loading and error states

**Phase 4: JavaScript - Advanced (30 min)**
- Add recent searches (localStorage)
- Add Celsius/Fahrenheit toggle
- Add geolocation
- Add dynamic backgrounds

---

## Option B: Movie Database App

### API Choice: TMDB (The Movie Database)

**API Key Required:** Yes (free at themoviedb.org)

**Free Tier Limits:**
- 50 requests per second
- No daily limit

### Required Endpoints

| Endpoint | URL | Purpose |
|----------|-----|---------|
| Popular | `https://api.themoviedb.org/3/movie/popular` | Popular movies |
| Top Rated | `https://api.themoviedb.org/3/movie/top_rated` | Highest rated |
| Upcoming | `https://api.themoviedb.org/3/movie/upcoming` | Coming soon |
| Search | `https://api.themoviedb.org/3/search/movie` | Search by title |
| Details | `https://api.themoviedb.org/3/movie/{id}` | Full movie info |
| Credits | `https://api.themoviedb.org/3/movie/{id}/credits` | Cast and crew |

### Data Structure

```javascript
// Movie List Response
{
    page: 1,
    results: [
        {
            id: 550,
            title: "Fight Club",
            poster_path: "/path.jpg",
            release_date: "1999-10-15",
            vote_average: 8.4,
            overview: "A ticking-time-bomb..."
        }
    ],
    total_pages: 500,
    total_results: 10000
}

// Movie Details Response
{
    id: 550,
    title: "Fight Club",
    runtime: 139,
    genres: [{ name: "Drama" }],
    credits: {
        cast: [{ name: "Brad Pitt", character: "Tyler" }]
    }
}
```

### UI Components

```
┌─────────────────────────────────────────────────────────────┐
│                       Movie Database                          │
├─────────────────────────────────────────────────────────────┤
│  [Search Movies...]  [🔍 Search]                            │
├─────────────────────────────────────────────────────────────┤
│  [Popular] [Top Rated] [Upcoming] [Watchlist]              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ Poster  │ │ Poster  │ │ Poster  │ │ Poster  │           │
│  │ Title   │ │ Title   │ │ Title   │ │ Title   │           │
│  │ 2024    │ │ 2024    │ │ 2024    │ │ 2024    │           │
│  │ ⭐ 8.5  │ │ ⭐ 8.5  │ │ ⭐ 8.5  │ │ ⭐ 8.5  │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
├─────────────────────────────────────────────────────────────┤
│                    [Prev] Page 1 of 10 [Next]               │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Plan

**Phase 1: HTML Structure (30 min)**
- Create container layout
- Add search section
- Add category tabs
- Add movies grid
- Add pagination controls

**Phase 2: CSS Styling (45 min)**
- Style movie cards with hover effects
- Create responsive grid layout
- Style modal for movie details
- Add loading animations

**Phase 3: JavaScript - Core (45 min)**
- Implement fetch for popular movies
- Implement category switching
- Display movies in grid
- Add pagination

**Phase 4: JavaScript - Advanced (30 min)**
- Add search functionality
- Add movie details modal
- Add watchlist (localStorage)
- Add cast information

---

## Option C: News Aggregator

### API Choice: GNews API

**API Key Required:** Optional (free tier works without key)

**Free Tier Limits:**
- 100 requests per day (without key)
- 1000 requests per day (with free key)

### Required Endpoints

| Endpoint | URL | Purpose |
|----------|-----|---------|
| Top Headlines | `https://gnews.io/api/v4/top-headlines` | Category-based news |
| Search | `https://gnews.io/api/v4/search` | Search by keyword |

### Data Structure

```javascript
// News Response
{
    totalArticles: 100,
    articles: [
        {
            title: "Article Title",
            description: "Article description...",
            content: "Full content...",
            url: "https://example.com/article",
            image: "https://example.com/image.jpg",
            publishedAt: "2024-01-01T12:00:00Z",
            source: { name: "Source Name" }
        }
    ]
}
```

### UI Components

```
┌─────────────────────────────────────────────────────────────┐
│                        News Aggregator                       │
├─────────────────────────────────────────────────────────────┤
│  [Search News...]  [🔍 Search]                              │
├─────────────────────────────────────────────────────────────┤
│  [General] [Tech] [Business] [Sports] [Entertainment]      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Image]  Title: Article Title                       │    │
│  │          Description text goes here...              │    │
│  │          Source • Date    [Save] [Read More]        │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Image]  Title: Another Article                     │    │
│  │          Description text goes here...              │    │
│  │          Source • Date    [Save] [Read More]        │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  Saved Articles: 3 📌 (click to view)                       │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Plan

**Phase 1: HTML Structure (30 min)**
- Create container layout
- Add search section
- Add category filters
- Add country selector
- Add news grid
- Add saved articles section

**Phase 2: CSS Styling (45 min)**
- Style news cards with images
- Create responsive grid layout
- Style saved articles section
- Add loading animations

**Phase 3: JavaScript - Core (45 min)**
- Implement fetch for top headlines
- Implement category switching
- Implement country filtering
- Display news in grid

**Phase 4: JavaScript - Advanced (30 min)**
- Add search functionality
- Add save for later (localStorage)
- Add saved articles section
- Add remove from saved

---

## Common Implementation Patterns

### Fetch with Error Handling

```javascript
async function fetchData(url) {
    showLoading();
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        return null;
        
    } finally {
        hideLoading();
    }
}
```

### localStorage Pattern

```javascript
// Save
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load
function loadData(key, defaultValue = []) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
}

// Add item
function addItem(key, newItem) {
    const items = loadData(key);
    items.unshift(newItem);
    saveData(key, items.slice(0, 5)); // Keep last 5
}
```

### Debounced Search

```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSearch = debounce((query) => {
    searchAPI(query);
}, 500);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### Pagination Helper

```javascript
class Pagination {
    constructor(currentPage, totalPages) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
    
    render() {
        return `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="prevPage()">Previous</button>
            <span>Page ${this.currentPage} of ${this.totalPages}</span>
            <button ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="nextPage()">Next</button>
        `;
    }
}
```

---

## API Key Management

### Never Commit API Keys

```javascript
// ❌ BAD - Don't do this
const API_KEY = 'abc123xyz789';

// ✅ GOOD - Use environment variables or prompt
const API_KEY = prompt('Enter your API key:');

// ✅ GOOD - For development, use a config file (add to .gitignore)
// config.js
const CONFIG = {
    WEATHER_API_KEY: 'your_key_here'
};
```

### Signup Links

| API | Signup URL |
|-----|------------|
| OpenWeatherMap | https://home.openweathermap.org/users/sign_up |
| TMDB | https://www.themoviedb.org/signup |
| GNews | https://gnews.io/register |

---

## Testing Checklist

### All Projects
- [ ] API calls work with valid inputs
- [ ] Error handling for invalid inputs
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1200px+)

### Weather Dashboard Specific
- [ ] City search works
- [ ] Temperature toggles correctly
- [ ] 5-day forecast displays
- [ ] Background changes with weather
- [ ] Recent searches persist
- [ ] Geolocation works (if allowed)

### Movie Database Specific
- [ ] Categories load correctly
- [ ] Search works
- [ ] Pagination works
- [ ] Movie modal opens with details
- [ ] Watchlist persists
- [ ] Cast information displays

### News Aggregator Specific
- [ ] Categories filter correctly
- [ ] Country selector works
- [ ] Search works
- [ ] Save/unsave works
- [ ] Saved articles persist
- [ ] External links open in new tab

---

## Deployment Considerations

### GitHub Pages
- Works well for static sites
- API keys in frontend code are visible
- Use backend proxy for sensitive keys

### Netlify/Vercel
- Environment variables support
- Serverless functions for API proxying
- Better for production

### Environment Variables Pattern
```javascript
// Use a proxy or backend
const API_URL = '/api/weather?city=';

// Or use environment variable (Netlify/Vercel)
const API_KEY = process.env.WEATHER_API_KEY;
