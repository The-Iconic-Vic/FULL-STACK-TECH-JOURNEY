# JSONPlaceholder Demo - Day 24 Project

## Project Overview
A demonstration of the Fetch API using JSONPlaceholder, a free fake REST API for testing.

## Skills Practiced
- `fetch()` - Make HTTP requests
- `response.json()` - Parse JSON response
- `response.ok` - Check response status
- Async/await with try/catch
- GET requests with and without parameters
- Error handling for HTTP errors

## File Structure
day-24-jsonplaceholder-demo/
├── index.html
├── style.css
├── script.js
└── README.md

text

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/posts` | GET | Fetch list of posts |
| `/users/{id}` | GET | Fetch specific user |

## Key Code Patterns

```javascript
// Basic fetch with async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}
Features
Fetch and display posts from API

Fetch and display user details

Tabbed interface

Loading states

Error handling

HTML escaping for security