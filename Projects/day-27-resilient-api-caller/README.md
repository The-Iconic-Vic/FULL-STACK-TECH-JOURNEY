# Resilient API Caller - Day 27 Project

## Project Overview
A robust API caller demonstrating comprehensive error handling, retry logic, timeout management, and user-friendly error messages.

## Skills Practiced
- Network error detection (offline, DNS)
- HTTP error handling (404, 500)
- JSON parsing error handling
- Retry logic with exponential backoff
- Request timeout implementation
- User-friendly error messages

## File Structure
day-27-resilient-api-caller/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Error Types Handled

| Error Type | Detection | User Message |
|------------|-----------|--------------|
| Network | `Failed to fetch` | No internet connection |
| 404 | HTTP 404 status | Resource not found |
| 500 | HTTP 500 status | Server error |
| Timeout | Race condition | Request timed out |
| JSON Parse | Invalid JSON | Invalid response format |

## Key Code Patterns

```javascript
// Fetch with timeout
function fetchWithTimeout(url, timeoutMs) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        )
    ]);
}

// Retry with exponential backoff
async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            if (attempt === retries) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

// Error classification
function classifyError(error) {
    if (error.message.includes('fetch')) return { type: 'network', message: 'No internet' };
    if (error.message.includes('404')) return { type: 'notfound', message: 'Not found' };
    if (error.message.includes('500')) return { type: 'server', message: 'Server error' };
    return { type: 'unknown', message: error.message };
}
Features
Automatic retry (3 attempts)

Exponential backoff between retries

5-second timeout for slow responses

Manual retry button

Error type classification

User-friendly error messages

Loading states