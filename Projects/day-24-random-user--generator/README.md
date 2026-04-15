# Random User Generator - Day 24 Project

## Project Overview
A random user generator that fetches data from the randomuser.me API and displays user information.

## Skills Practiced
- `fetch()` with external API
- `response.json()` - Parse JSON response
- `response.ok` - Check response status
- Async/await with try/catch
- Loading states
- Error handling
- DOM manipulation with API data

## File Structure
day-24-random-user-generator/
├── index.html
├── style.css
├── script.js
└── README.md

text

## API Used
| API | Endpoint | Description |
|-----|----------|-------------|
| Random User Generator | `https://randomuser.me/api/` | Free random user data |

## Data Displayed

| Field | Description |
|-------|-------------|
| Avatar | User profile picture |
| Name | First and last name |
| Email | Email address |
| Location | City and country |
| Phone | Phone number |
| DOB | Date of birth |

## Key Code Patterns

```javascript
async function fetchRandomUser() {
    setLoadingState();
    
    try {
        const response = await fetch('https://randomuser.me/api/');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const user = data.results[0];
        displayUser(user);
    } catch (error) {
        setErrorState(error.message);
    } finally {
        // Cleanup if needed
    }
}
Features
Fetch random user from API

Display user avatar, name, email, location, phone, DOB

Load new random user with button

Loading spinner animation

Error handling for failed requests

HTML escaping for security

Responsive design