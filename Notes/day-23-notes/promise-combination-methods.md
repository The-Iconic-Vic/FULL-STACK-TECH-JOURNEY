# 📘 Promise Combination Methods

## Promise.all()

Waits for ALL promises to resolve. Rejects if ANY promise rejects.

```javascript
const [user, posts, friends] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchFriends()
]);
Use Cases
Dashboard loading multiple independent widgets

User profile with multiple data sources

Page with several API calls

Error Behavior
javascript
try {
    const results = await Promise.all([
        Promise.resolve(1),
        Promise.reject('Error!'),
        Promise.resolve(3)
    ]);
} catch (error) {
    console.log(error);  // 'Error!' (first rejection)
}
Empty Array
javascript
const results = await Promise.all([]);
console.log(results);  // [] (resolves immediately)
Promise.allSettled()
Waits for ALL promises to settle (resolve OR reject). Never rejects.

javascript
const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchFriends()
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
    } else {
        console.log('Failed:', result.reason);
    }
});
Result Structure
javascript
// Fulfilled result
{
    status: 'fulfilled',
    value: 'resolved value'
}

// Rejected result
{
    status: 'rejected',
    reason: 'error message'
}
Use Cases
Analytics where you want all data, even if some fails

Logging multiple independent operations

Don't want one failure to ruin everything

Promise.race()
Returns the first promise that settles (resolve OR reject).

javascript
const winner = await Promise.race([
    fetchFromAPI1(),
    fetchFromAPI2(),
    timeout(5000)
]);
Use Cases
Timeout for slow operations

Multiple CDN endpoints, use fastest response

Race conditions

Example: Timeout
javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

async function fetchWithTimeout(url, ms = 5000) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed or timed out');
    }
}
Promise.any()
Returns the first promise that fulfills (ignores rejections).

javascript
const winner = await Promise.any([
    fetchFromSlowAPI(),
    fetchFromFastAPI(),
    fetchFromBackupAPI()
]);
Use Cases
Multiple fallback APIs

Get first successful response

Redundant data sources

Error Behavior
javascript
try {
    const result = await Promise.any([
        Promise.reject('Error 1'),
        Promise.reject('Error 2')
    ]);
} catch (error) {
    console.log(error.errors);  // ['Error 1', 'Error 2']
    console.log(error.message); // 'All promises were rejected'
}
Comparison Table
Method	Waits for	Fails if	Returns	Use when
all()	All promises	Any rejects	Array of values	All operations must succeed
allSettled()	All promises	Never	Array of result objects	Want all results, ignore failures
race()	First to settle	First to reject	Single value	Need fastest response, timeout
any()	First to fulfill	All reject	Single value	Need first success, have fallbacks
Visual Timeline
text
Promise.all()
Start: |---A---|
       |---B---|
       |---C---|
End:   |-------| (takes max time)

Promise.allSettled()
Start: |---A---|
       |---B---|
       |---C---|
End:   |-------| (takes max time, never fails)

Promise.race()
Start: |---A---|
       |---B---|
       |---C---|
End:   |---| (takes min time)

Promise.any()
Start: |---A---|
       |---B---|
       |---C---|
End:   |---| (takes min successful time)
Practical Examples
Dashboard Widget Loader
javascript
async function loadDashboard() {
    const [stats, chartData, recentActivity] = await Promise.all([
        fetchStats(),
        fetchChartData(),
        fetchRecentActivity()
    ]);
    
    return { stats, chartData, recentActivity };
}
Resilient Data Fetching
javascript
async function fetchWithFallbacks() {
    const result = await Promise.any([
        fetchFromPrimaryAPI(),
        fetchFromSecondaryAPI(),
        fetchFromCache()
    ]);
    
    return result;
}
Timeout Pattern
javascript
async function fetchWithTimeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
    
    return Promise.race([promise, timeoutPromise]);
}
Analytics with Error Logging
javascript
async function collectAnalytics() {
    const results = await Promise.allSettled([
        trackPageView(),
        trackUserAction(),
        sendToAnalytics()
    ]);
    
    results.forEach(result => {
        if (result.status === 'rejected') {
            console.error('Analytics failed:', result.reason);
        }
    });
}
Performance Comparison
javascript
// Sequential: ~3.5 seconds
async function sequential() {
    const a = await taskA();  // 1 sec
    const b = await taskB();  // 1.5 sec
    const c = await taskC();  // 1 sec
    return [a, b, c];
}

// Parallel with Promise.all(): ~1.5 seconds
async function parallel() {
    const [a, b, c] = await Promise.all([
        taskA(),  // 1 sec
        taskB(),  // 1.5 sec
        taskC()   // 1 sec
    ]);
    return [a, b, c];
}