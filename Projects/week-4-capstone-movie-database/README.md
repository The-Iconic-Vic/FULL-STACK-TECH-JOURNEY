# Movie Database App - Week 4 Capstone

## Project Overview
A complete movie discovery app using The Movie Database (TMDB) API with search, categories, watchlist, and detailed movie information.

## Technologies Used
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, grid layout, responsive design |
| JavaScript | API calls, DOM manipulation, localStorage |
| TMDB API | Movie data |

## Features

### Core Features ✅
| Feature | Description |
|---------|-------------|
| Search movies | Search by title |
| Movie posters | Display poster images |
| Release date | Year of release |
| Rating display | TMDB vote average |
| Popular movies | Trending movies |
| Top rated | Highest rated movies |
| Upcoming | Future releases |
| Movie details | Modal with full info |
| Loading states | Visual feedback |
| Error handling | User-friendly messages |
| Responsive design | Mobile + desktop |

### Advanced Features ✅
- Pagination (load more results)
- Watchlist (save to localStorage)
- Cast information
- Runtime display

## API Used
| API | Endpoint | Purpose |
|-----|----------|---------|
| TMDB | `/movie/popular` | Popular movies |
| TMDB | `/movie/top_rated` | Top rated movies |
| TMDB | `/movie/upcoming` | Upcoming movies |
| TMDB | `/search/movie` | Search movies |
| TMDB | `/movie/{id}` | Movie details |
| TMDB | `/movie/{id}/credits` | Cast information |

## Setup Instructions
1. Sign up for a free API key at [TMDB](https://www.themoviedb.org/signup)
2. Go to Settings → API → Request API key
3. Replace `YOUR_API_KEY_HERE` in script.js with your API key
4. Open index.html in browser