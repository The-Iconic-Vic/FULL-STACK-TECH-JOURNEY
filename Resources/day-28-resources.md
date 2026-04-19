# 📚 Day 28 Resources - Week 4 Capstone

## 📖 API Documentation

### Weather APIs

| API | Documentation | Sign Up |
|-----|---------------|---------|
| OpenWeatherMap | https://openweathermap.org/current | https://home.openweathermap.org/users/sign_up |
| WeatherAPI | https://www.weatherapi.com/docs/ | https://www.weatherapi.com/signup.aspx |
| Weather.gov (US only) | https://www.weather.gov/documentation | No key needed |

### Movie APIs

| API | Documentation | Sign Up |
|-----|---------------|---------|
| TMDB | https://developers.themoviedb.org/3 | https://www.themoviedb.org/signup |
| OMDb | http://www.omdbapi.com/ | http://www.omdbapi.com/apikey.aspx |

### News APIs

| API | Documentation | Sign Up |
|-----|---------------|---------|
| GNews | https://gnews.io/docs | https://gnews.io/register |
| NewsAPI | https://newsapi.org/docs | https://newsapi.org/register |
| Currents API | https://currentsapi.services/docs | https://currentsapi.services/register |

## 🛠️ Development Tools

| Tool | Purpose | Link |
|------|---------|------|
| Postman | Test APIs before coding | https://postman.com |
| JSON Formatter | Format API responses | https://jsonformatter.org |
| Chrome DevTools | Debug API calls | Built into Chrome |
| Responsively App | Multi-device testing | https://responsively.app |

## 📝 API Key Management

### Environment Variables (Netlify/Vercel)
```javascript
// Netlify functions or Vercel serverless
const API_KEY = process.env.WEATHER_API_KEY;
```

### Local Development Config
```javascript
// config.js (add to .gitignore)
const CONFIG = {
    WEATHER_API_KEY: 'your_key_here',
    TMDB_API_KEY: 'your_key_here'
};
```

### Browser LocalStorage (Development Only)
```javascript
// Not secure for production, okay for local testing
localStorage.setItem('API_KEY', 'your_key');
const API_KEY = localStorage.getItem('API_KEY');
```

## ✅ Capstone Checklist

### Planning Phase
- [ ] Choose which app to build (Weather/Movie/News)
- [ ] Sign up for API and get API key
- [ ] Read API documentation
- [ ] Test API endpoints in browser/postman
- [ ] Sketch UI on paper
- [ ] Plan HTML structure
- [ ] Plan CSS components
- [ ] Plan JavaScript functions

### Development Phase
- [ ] Create HTML structure
- [ ] Add CSS styling (mobile-first)
- [ ] Implement API fetch function
- [ ] Display data on page
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add localStorage for persistence
- [ ] Add advanced features
- [ ] Make responsive

### Testing Phase
- [ ] Test with valid inputs
- [ ] Test with invalid inputs
- [ ] Test offline scenario
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Test different browsers

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| API returns 401 | Invalid/missing API key | Check API key, ensure it's active |
| CORS error | API doesn't allow cross-origin | Use proxy or serverless function |
| Rate limit exceeded | Too many requests | Implement caching, reduce requests |
| Data not displaying | Wrong property name | Check API response structure |
| Images not loading | Wrong URL format | Check image URL construction |
| localStorage not persisting | Storage full or disabled | Handle errors, check quota |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Working with APIs | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs |
| Fetch API Best Practices | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch |
| localStorage Guide | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| Responsive Design Patterns | https://developers.google.com/web/fundamentals/design-and-ux/responsive |

