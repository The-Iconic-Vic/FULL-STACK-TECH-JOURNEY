# 📘 Error Types Reference

## Categories of Errors

| Category | Description | Examples |
|----------|-------------|----------|
| **Network Errors** | Connection issues, DNS failures | Offline, CORS, DNS lookup failed |
| **HTTP Errors** | Server response with error status | 404, 500, 401, 403, 429 |
| **API Errors** | Business logic errors | Invalid API key, quota exceeded |
| **Parsing Errors** | Data format issues | Invalid JSON, malformed response |
| **Timeout Errors** | Request takes too long | Slow server, network latency |

---

## Network Errors

### Detection
```javascript
// Check online status
if (!navigator.onLine) {
    console.log('User is offline');
}

// Fetch network error
try {
    await fetch('https://example.com');
} catch (error) {
    if (error.name === 'TypeError') {
        console.log('Network error:', error);
    }
}
Common Network Error Messages
Error Message	Cause
Failed to fetch	Network failure or CORS
NetworkError when attempting to fetch	DNS or connection issue
Load failed	Server unreachable
TypeError: Failed to fetch	Offline or blocked request
User-Friendly Messages
javascript
function getNetworkErrorMessage(error) {
    if (!navigator.onLine) {
        return '📡 No internet connection. Please check your network.';
    }
    
    if (error.message.includes('CORS')) {
        return '🌐 Cross-origin request blocked.';
    }
    
    return '🌐 Network error. Please check your connection.';
}
HTTP Errors
Status Code Ranges
Range	Type	Meaning
200-299	Success	Request successful
300-399	Redirection	Resource moved
400-499	Client Error	Problem with request
500-599	Server Error	Problem with server
Client Errors (4xx)
Code	Name	User Message
400	Bad Request	"Invalid request. Please check your input."
401	Unauthorized	"Please log in to continue."
403	Forbidden	"You don't have permission to access this."
404	Not Found	"The requested resource was not found."
408	Request Timeout	"Request timed out. Please try again."
429	Too Many Requests	"Too many requests. Please wait a moment."
Server Errors (5xx)
Code	Name	User Message
500	Internal Server Error	"Server error. Please try again later."
502	Bad Gateway	"Invalid response from server."
503	Service Unavailable	"Service temporarily unavailable."
504	Gateway Timeout	"Server timeout. Please try again."
Handling HTTP Errors
javascript
async function handleHTTPError(response) {
    switch(response.status) {
        case 400:
            const error = await response.json();
            throw new Error(`Validation error: ${error.message}`);
        case 401:
            // Redirect to login
            window.location.href = '/login';
            throw new Error('Please log in');
        case 403:
            throw new Error('You don\'t have permission');
        case 404:
            throw new Error('Resource not found');
        case 429:
            const retryAfter = response.headers.get('Retry-After');
            throw new Error(`Rate limited. Try again in ${retryAfter} seconds`);
        case 500:
        case 502:
        case 503:
        case 504:
            throw new Error('Server error. Please try again later');
        default:
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
}
API Errors
Common API Error Formats
JSON:API Format

json
{
    "errors": [
        {
            "status": "422",
            "title": "Validation Error",
            "detail": "Email is required"
        }
    ]
}
Simple Format

json
{
    "error": {
        "code": "RATE_LIMIT_EXCEEDED",
        "message": "You have exceeded your rate limit"
    }
}
Handling API Errors
javascript
async function handleAPIError(response) {
    const data = await response.json();
    
    // JSON:API format
    if (data.errors) {
        const messages = data.errors.map(e => e.detail || e.title);
        throw new Error(messages.join(', '));
    }
    
    // Simple format
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    // Fallback
    throw new Error(`API error: ${response.status}`);
}
Parsing Errors
Invalid JSON
javascript
try {
    const data = await response.json();
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('Invalid JSON response');
        // Try to get as text for debugging
        const text = await response.text();
        console.log('Raw response:', text);
        throw new Error('Invalid response format from server');
    }
}
Empty Response
javascript
async function safeParseJSON(response) {
    const text = await response.text();
    
    if (!text || text.trim() === '') {
        return null;  // Empty response
    }
    
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error('JSON parse error:', text);
        throw new Error('Invalid JSON response');
    }
}
Timeout Errors
Implementing Timeout
javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), ms);
    });
}

async function fetchWithTimeout(url, ms = 10000) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return response;
    } catch (error) {
        if (error.message === 'Request timeout') {
            throw new Error('The request took too long. Please try again.');
        }
        throw error;
    }
}
AbortController (Modern)
javascript
async function fetchWithAbort(url, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}
Error Classification Helper
javascript
class ErrorClassifier {
    static classify(error, response = null) {
        // Network errors
        if (!navigator.onLine) {
            return {
                type: 'network',
                severity: 'high',
                userMessage: 'No internet connection',
                retryable: true,
                showOfflineUI: true
            };
        }
        
        if (error.name === 'TypeError') {
            return {
                type: 'network',
                severity: 'high',
                userMessage: 'Network error - check your connection',
                retryable: true,
                showOfflineUI: true
            };
        }
        
        // Timeout
        if (error.message.includes('timeout') || error.name === 'AbortError') {
            return {
                type: 'timeout',
                severity: 'medium',
                userMessage: 'Request timed out',
                retryable: true,
                showOfflineUI: false
            };
        }
        
        // HTTP errors
        if (response && !response.ok) {
            const status = response.status;
            
            if (status === 401) {
                return {
                    type: 'auth',
                    severity: 'high',
                    userMessage: 'Please log in to continue',
                    retryable: false,
                    redirectToLogin: true
                };
            }
            
            if (status === 403) {
                return {
                    type: 'forbidden',
                    severity: 'high',
                    userMessage: 'Access denied',
                    retryable: false,
                    showPermissionUI: true
                };
            }
            
            if (status === 404) {
                return {
                    type: 'notfound',
                    severity: 'medium',
                    userMessage: 'Resource not found',
                    retryable: false,
                    showNotFoundUI: true
                };
            }
            
            if (status === 429) {
                return {
                    type: 'ratelimit',
                    severity: 'medium',
                    userMessage: 'Rate limit exceeded. Please wait.',
                    retryable: true,
                    delay: parseInt(response.headers.get('Retry-After') || '60')
                };
            }
            
            if (status >= 500) {
                return {
                    type: 'server',
                    severity: 'high',
                    userMessage: 'Server error. Please try again later.',
                    retryable: true,
                    showServerErrorUI: true
                };
            }
        }
        
        // Parsing errors
        if (error instanceof SyntaxError) {
            return {
                type: 'parse',
                severity: 'medium',
                userMessage: 'Invalid response format',
                retryable: false,
                showDebugInfo: true
            };
        }
        
        // Unknown
        return {
            type: 'unknown',
            severity: 'medium',
            userMessage: `Error: ${error.message}`,
            retryable: true,
            showDebugInfo: true
        };
    }
}