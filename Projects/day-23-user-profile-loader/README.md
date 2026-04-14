# User Profile Loader - Day 23 Project

## Project Overview
A user profile loader that fetches multiple data sources in parallel using Promise.all(), demonstrating the power of concurrent async operations.

## Skills Practiced
- `async/await` syntax
- `Promise.all()` - run multiple promises in parallel
- Concurrent vs sequential execution
- Loading states with async/await
- Performance comparison (parallel is faster!)

## File Structure
day-23-user-profile-loader/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Data Sources

| Source | Duration | Data |
|--------|----------|------|
| User Profile | 1 second | Name, email, bio, member since |
| User Posts | 1.5 seconds | 3 posts with titles and likes |
| User Friends | 1 second | 3 friends names |

## Sequential vs Parallel Comparison

```javascript
// Sequential (SLOW) - 3.5 seconds
const profile = await fetchUserProfile();   // 1 sec
const posts = await fetchUserPosts();       // 1.5 sec
const friends = await fetchUserFriends();   // 1 sec

// Parallel (FAST) - 1.5 seconds
const [profile, posts, friends] = await Promise.all([
    fetchUserProfile(),
    fetchUserPosts(),
    fetchUserFriends()
]);
Promise.all() Benefits
Benefit	Description
Faster execution	Operations run concurrently
Clean syntax	Destructuring makes code readable
Error handling	Single try/catch for all
Atomic operation	All succeed or handle error together
Features
Parallel data fetching with Promise.all()

Loading spinner animation

Timing display showing performance

Clean async/await syntax

Error handling with try/catch

Responsive design