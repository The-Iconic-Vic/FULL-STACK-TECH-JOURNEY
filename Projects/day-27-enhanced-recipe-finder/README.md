# Enhanced Recipe Finder - Day 27 Project

## Project Overview
An enhanced recipe finder with comprehensive error handling, localStorage caching, offline support, and retry functionality.

## Skills Practiced
- Network error detection and handling
- HTTP error handling (404, 500)
- Rate limit detection
- localStorage caching with expiration
- Offline support (cached results)
- Retry mechanism for failed requests

## File Structure
day-27-enhanced-recipe-finder/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Error Types Handled

| Error Type | Detection | User Message |
|------------|-----------|--------------|
| Offline | `navigator.onLine === false` | No internet connection |
| Network | `Failed to fetch` | Network error |
| Rate Limit | HTTP 429 | API rate limit reached |
| Not Found | HTTP 404 | No recipes found |
| Server Error | HTTP 500 | Server error |

## Caching System

```javascript
// Cache with 1-hour expiration
function saveToCache(ingredient, area, data) {
    const cacheData = {
        timestamp: Date.now(),
        data: data
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

// Load from cache (checks expiration)
function loadFromCache(ingredient, area) {
    const cached = localStorage.getItem(cacheKey);
    if (cached && (Date.now() - cacheData.timestamp) < 3600000) {
        return cacheData.data;
    }
    return null;
}
Features
Error classification with user-friendly messages

Automatic retry button on failure

localStorage cache (1-hour expiration)

Offline support (shows cached results)

Rate limit detection

Loading states

Retry mechanism