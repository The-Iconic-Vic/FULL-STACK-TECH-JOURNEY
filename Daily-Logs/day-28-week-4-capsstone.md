# 📅 Day 28: Week 4 Capstone Project

**Date:** April 19, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topic:** Week 4 Capstone - API-Powered Web Application

---

## 📋 Project Overview

This is the Week 4 Capstone project – a complete, production-ready API-powered web application. You can choose from three options: Weather Dashboard, Movie Database App, or News Aggregator. All three projects demonstrate mastery of Fetch API, error handling, asynchronous JavaScript, DOM manipulation, and localStorage.

---

## 🎯 Capstone Options

### Option A: Weather Dashboard
Build a complete weather application using OpenWeatherMap API.

### Option B: Movie Database App
Build a movie discovery app using The Movie Database (TMDB) API.

### Option C: News Aggregator
Build a news reader app using GNews API.

---

## ✅ Weather Dashboard Requirements Checklist

### Core Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Search by city name | ✅ | Input field with search button |
| Current temperature | ✅ | Display with unit toggle |
| Weather condition | ✅ | Text description |
| Humidity | ✅ | Percentage display |
| Wind speed | ✅ | km/h or mph |
| High/Low temperatures | ✅ | Daily min/max |
| Weather icon | ✅ | Dynamic icon based on condition |
| 5-day forecast | ✅ | Daily forecast cards |
| Dynamic background | ✅ | Changes based on weather |
| Recent searches | ✅ | localStorage storage |
| Loading states | ✅ | Spinner animation |
| Error handling | ✅ | User-friendly messages |
| Responsive design | ✅ | Mobile + desktop |

### Advanced Features Implemented
| Feature | Status |
|---------|--------|
| Celsius/Fahrenheit toggle | ✅ |
| "Feels like" temperature | ✅ |
| Sunrise/Sunset times | ✅ |
| Geolocation | ✅ |

---

## ✅ Movie Database App Requirements Checklist

### Core Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Search by title | ✅ | Search input with button |
| Movie poster | ✅ | TMDB poster images |
| Release date | ✅ | Year display |
| Rating display | ✅ | TMDB vote average |
| Popular movies | ✅ | Default landing page |
| Top rated movies | ✅ | Category tab |
| Upcoming movies | ✅ | Category tab |
| Movie details modal | ✅ | Full movie information |
| Cast information | ✅ | Top 5 cast members |
| Loading states | ✅ | Spinner animation |
| Error handling | ✅ | User-friendly messages |
| Responsive design | ✅ | Mobile + desktop |

### Advanced Features Implemented
| Feature | Status |
|---------|--------|
| Pagination | ✅ |
| Watchlist (localStorage) | ✅ |
| Runtime display | ✅ |

---

## ✅ News Aggregator Requirements Checklist

### Core Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Search by keyword | ✅ | Search input |
| Category filters | ✅ | Technology, Sports, Business, etc. |
| Country-specific news | ✅ | Country selector |
| Display headlines | ✅ | Title and description |
| Article images | ✅ | When available |
| Source and date | ✅ | Displayed in meta |
| Read full article | ✅ | Opens in new tab |
| Save for later | ✅ | localStorage |
| Loading states | ✅ | Spinner animation |
| Error handling | ✅ | User-friendly messages |
| Responsive design | ✅ | Mobile + desktop |

### Advanced Features Implemented
| Feature | Status |
|---------|--------|
| Saved articles section | ✅ |
| Remove from saved | ✅ |
| Category filtering | ✅ |

---

## 🏗️ Weather Dashboard Architecture

### File Structure
```
week-4-capstone-weather-dashboard/
├── index.html          # Main HTML file
├── style.css           # All styles with dynamic backgrounds
├── script.js           # All JavaScript
└── README.md           # Documentation
```

### API Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/weather` | Current weather data |
| `/forecast` | 5-day forecast |

### Data Flow
1. User enters city name or uses geolocation
2. Fetch current weather and forecast data
3. Update UI with temperature, conditions, details
4. Change background based on weather condition
5. Save city to recent searches
6. Cache unit preference (Celsius/Fahrenheit)

### Key Functions
```javascript
getWeather(city)           // Fetch current weather
getForecast(lat, lon)      // Fetch 5-day forecast
displayCurrentWeather()    // Render current conditions
displayForecast()          // Render forecast cards
updateBackground()         // Change gradient based on weather
getGeolocation()           // Get user's location
setUnit()                  // Toggle Celsius/Fahrenheit
```

---

## 🏗️ Movie Database App Architecture

### File Structure
```
week-4-capstone-movie-database/
├── index.html          # Main HTML file
├── style.css           # All styles with modal
├── script.js           # All JavaScript
└── README.md           # Documentation
```

### API Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/movie/popular` | Popular movies |
| `/movie/top_rated` | Top rated movies |
| `/movie/upcoming` | Upcoming movies |
| `/search/movie` | Search movies |
| `/movie/{id}` | Movie details |
| `/movie/{id}/credits` | Cast information |

### Data Flow
1. Load default category (popular) on page load
2. User can switch categories or search
3. Fetch movies from TMDB API
4. Display movie cards with posters
5. Click movie to fetch details and show modal
6. Add/remove movies to watchlist (localStorage)

### Key Functions
```javascript
fetchMovies(endpoint, page)    // Fetch movies by category
searchMovies(query, page)      // Search for movies
fetchMovieDetails(id)          // Get full movie info
showMovieModal(movie, credits) // Display modal with details
addToWatchlist()               // Save to localStorage
removeFromWatchlist()          // Remove from localStorage
```

---

## 🏗️ News Aggregator Architecture

### File Structure
```
week-4-capstone-news-aggregator/
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # All JavaScript
└── README.md           # Documentation
```

### API Endpoints Used
| Endpoint | Purpose |
|----------|---------|
| `/top-headlines` | Category-based news |
| `/search` | Search news |

### Data Flow
1. Load default category (general) on page load
2. User can filter by category, country, or search
3. Fetch news from GNews API
4. Display news cards with images, titles, descriptions
5. User can save articles for later reading
6. Saved articles persist in localStorage

### Key Functions
```javascript
fetchNews()                    // Fetch news based on filters
showNews(articles)             // Display news cards
saveArticle(article)           // Save to localStorage
removeSavedArticle(url)        // Remove from saved
updateSavedUI()                // Update saved articles section
```

---

## 🧪 Testing Checklist

### Weather Dashboard
- [ ] Search for valid city
- [ ] Search for invalid city (error handling)
- [ ] Click recent search to reload
- [ ] Toggle between Celsius/Fahrenheit
- [ ] Use geolocation button
- [ ] Verify 5-day forecast displays
- [ ] Verify background changes with weather
- [ ] Test offline mode (cached recent searches)
- [ ] Test responsive design

### Movie Database App
- [ ] Browse popular movies
- [ ] Switch to top rated category
- [ ] Switch to upcoming category
- [ ] Search for a movie
- [ ] Click movie to see details modal
- [ ] Add movie to watchlist
- [ ] View watchlist category
- [ ] Remove from watchlist
- [ ] Test pagination (next/previous)
- [ ] Test responsive design

### News Aggregator
- [ ] View default news (general)
- [ ] Switch categories
- [ ] Change country
- [ ] Search for news
- [ ] Click "Read full article" (opens new tab)
- [ ] Save article to saved section
- [ ] View saved articles
- [ ] Remove from saved
- [ ] Test responsive design

---

## 📚 API Documentation Links

| API | Documentation | API Key Required |
|-----|---------------|------------------|
| OpenWeatherMap | https://openweathermap.org/api | Yes (free tier) |
| TMDB | https://developers.themoviedb.org/3 | Yes (free) |
| GNews | https://gnews.io/docs | Optional (free tier without key) |

---

## 🔑 Key Takeaways

1. **API keys need to be kept secure** — never commit to public repos
2. **Always handle loading states** — users need visual feedback
3. **Error handling is critical** — APIs fail, networks disconnect
4. **localStorage is great for user preferences** — recent searches, watchlist, saved articles
5. **Dynamic backgrounds improve UX** — visual feedback based on data
6. **Pagination prevents overwhelming** — large datasets need pagination
7. **Modal dialogs are great for details** — without leaving the page
8. **Responsive design is non-negotiable** — mobile users need full functionality

---

## 🚀 Future Enhancements

### Weather Dashboard
- [ ] Hourly forecast
- [ ] Air quality index
- [ ] Animated weather backgrounds
- [ ] Voice search
- [ ] Multiple day detailed forecast

### Movie Database App
- [ ] Genre filtering
- [ ] Year range filter
- [ ] Trailer modal
- [ ] Similar movies section
- [ ] Infinite scroll

### News Aggregator
- [ ] Source filtering
- [ ] Date range filter
- [ ] Read later queue
- [ ] Share articles
- [ ] Push notifications for breaking news
