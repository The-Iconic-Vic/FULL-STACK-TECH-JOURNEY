// ============================================
// RESILIENT API CALLER
// Demonstrating: Error types, retry logic, user-friendly messages
// ============================================

// Mock API endpoints (simulating different responses)
const endpoints = {
    success: 'https://jsonplaceholder.typicode.com/posts/1',
    '404': 'https://jsonplaceholder.typicode.com/posts/99999',
    '500': 'https://httpstat.us/500',
    slow: 'https://httpstat.us/200?sleep=3000',
    invalid: 'https://jsonplaceholder.typicode.com/posts/invalid-json'
};

// DOM Elements
const endpointSelect = document.getElementById('endpoint-select');
const fetchBtn = document.getElementById('fetch-btn');
const statusMessage = document.getElementById('status-message');
const resultContainer = document.getElementById('result-container');
const resultData = document.getElementById('result-data');

// State
let currentRetryCount = 0;
const MAX_RETRIES = 3;
const TIMEOUT_MS = 5000;

// ============================================
// FETCH WITH TIMEOUT
// ============================================
function fetchWithTimeout(url, timeoutMs) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
        )
    ]);
}

// ============================================
// FETCH WITH RETRY LOGIC
// ============================================
async function fetchWithRetry(url, retries = MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            updateStatus(`Attempt ${attempt}/${retries}...`, 'loading');
            
            const response = await fetchWithTimeout(url, TIMEOUT_MS);
            
            // Check if response is OK
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // Try to parse JSON
            const data = await response.json();
            return { success: true, data };
            
        } catch (error) {
            const isLastAttempt = attempt === retries;
            
            if (isLastAttempt) {
                throw error;
            }
            
            // Wait before retrying (exponential backoff)
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
            updateStatus(`Attempt ${attempt} failed. Retrying in ${delay/1000}s...`, 'warning');
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// ============================================
// CLASSIFY ERROR TYPE
// ============================================
function classifyError(error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('fetch') || message.includes('network') || message.includes('offline')) {
        return { type: 'network', userMessage: '📡 No internet connection. Please check your network and try again.' };
    }
    
    if (message.includes('timeout')) {
        return { type: 'timeout', userMessage: '⏰ Request timed out. The server is taking too long to respond.' };
    }
    
    if (message.includes('404')) {
        return { type: 'notfound', userMessage: '🔍 Resource not found. The requested data does not exist.' };
    }
    
    if (message.includes('500')) {
        return { type: 'server', userMessage: '⚠️ Server error. Please try again later.' };
    }
    
    if (message.includes('json')) {
        return { type: 'parse', userMessage: '📄 Invalid response format. The server returned malformed data.' };
    }
    
    return { type: 'unknown', userMessage: `❌ An error occurred: ${error.message}` };
}

// ============================================
// UPDATE UI FUNCTIONS
// ============================================
function updateStatus(message, type = 'idle') {
    statusMessage.className = `status-message ${type}`;
    statusMessage.innerHTML = message;
}

function showLoading() {
    fetchBtn.disabled = true;
    resultContainer.classList.add('hidden');
}

function hideLoading() {
    fetchBtn.disabled = false;
}

function showResult(data) {
    resultContainer.classList.remove('hidden');
    resultData.textContent = JSON.stringify(data, null, 2);
    updateStatus('✅ Request completed successfully!', 'success');
}

function showError(error) {
    const { userMessage, type } = classifyError(error);
    
    let retryButton = '';
    if (type !== 'parse') {
        retryButton = `<button id="manual-retry" class="retry-btn">🔄 Try Again</button>`;
    }
    
    updateStatus(`${userMessage}<br>${retryButton}`, 'error');
    
    // Add retry button handler
    const retryBtn = document.getElementById('manual-retry');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            handleFetch();
        });
    }
}

// ============================================
// MAIN FETCH HANDLER
// ============================================
async function handleFetch() {
    showLoading();
    
    const endpointType = endpointSelect.value;
    const url = endpoints[endpointType];
    
    try {
        const result = await fetchWithRetry(url);
        showResult(result.data);
    } catch (error) {
        console.error('Fetch error:', error);
        showError(error);
    } finally {
        hideLoading();
    }
}

// ============================================
// DEMO: Different error types in console
// ============================================
console.log('=== Error Handling Demo ===');
console.log('Network error:', classifyError(new Error('Failed to fetch')));
console.log('404 error:', classifyError(new Error('HTTP 404: Not Found')));
console.log('500 error:', classifyError(new Error('HTTP 500: Server Error')));
console.log('Timeout error:', classifyError(new Error('Request timeout')));
console.log('JSON error:', classifyError(new Error('Unexpected token in JSON')));

// ============================================
// EVENT LISTENERS
// ============================================
fetchBtn.addEventListener('click', handleFetch);