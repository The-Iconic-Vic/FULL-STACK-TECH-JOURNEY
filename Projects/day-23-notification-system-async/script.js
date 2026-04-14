// ============================================
// NOTIFICATION SYSTEM WITH ASYNC/AWAIT
// Demonstrating: async/await, try/catch, loading states
// ============================================

const loadBtn = document.getElementById('load-data-btn');
const notificationIcon = document.getElementById('notification-icon');
const notificationMessage = document.getElementById('notification-message');

// ============================================
// SIMULATE API CALL WITH PROMISE
// ============================================
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            // 70% success rate, 30% error rate
            if (random > 0.3) {
                resolve({
                    success: true,
                    message: "Data loaded successfully!",
                    data: {
                        userId: 12345,
                        timestamp: new Date().toLocaleTimeString()
                    }
                });
            } else {
                reject({
                    success: false,
                    message: "Network error: Failed to fetch data",
                    code: 500
                });
            }
        }, 2000);
    });
}

// ============================================
// UPDATE UI FOR LOADING STATE
// ============================================
function setLoadingState() {
    notificationIcon.textContent = "⏳";
    notificationIcon.classList.add('spin');
    notificationMessage.textContent = "Loading... Please wait";
    notificationMessage.className = "notification-message loading";
    loadBtn.disabled = true;
    loadBtn.textContent = "Loading...";
}

// ============================================
// UPDATE UI FOR SUCCESS STATE
// ============================================
function setSuccessState(data) {
    notificationIcon.textContent = "✅";
    notificationIcon.classList.remove('spin');
    notificationMessage.textContent = `✓ ${data.message} (Received at ${data.data.timestamp})`;
    notificationMessage.className = "notification-message success";
    loadBtn.disabled = false;
    loadBtn.textContent = "Load Data";
}

// ============================================
// UPDATE UI FOR ERROR STATE
// ============================================
function setErrorState(error) {
    notificationIcon.textContent = "❌";
    notificationIcon.classList.remove('spin');
    notificationMessage.textContent = `✗ ${error.message}`;
    notificationMessage.className = "notification-message error";
    loadBtn.disabled = false;
    loadBtn.textContent = "Retry?";
}

// ============================================
// RESET UI TO IDLE STATE
// ============================================
function resetToIdle() {
    notificationIcon.textContent = "📡";
    notificationIcon.classList.remove('spin');
    notificationMessage.textContent = "Click the button to load data";
    notificationMessage.className = "";
    loadBtn.disabled = false;
    loadBtn.textContent = "Load Data";
}

// ============================================
// ASYNC/AWAIT VERSION - CLEANER!
// ============================================
async function handleLoadData() {
    setLoadingState();
    
    try {
        // await pauses execution until fetchData() resolves
        const data = await fetchData();
        setSuccessState(data);
    } catch (error) {
        setErrorState(error);
    }
}

// ============================================
// DEMO: Sequential vs Parallel with async/await
// ============================================

// Sequential (one after another) - slower
async function sequentialDemo() {
    console.log("=== Sequential Execution ===");
    const start = Date.now();
    
    const result1 = await fetchData();
    const result2 = await fetchData();
    const result3 = await fetchData();
    
    const duration = Date.now() - start;
    console.log(`Sequential took ${duration}ms`);
}

// Parallel (all at once) - faster
async function parallelDemo() {
    console.log("=== Parallel Execution ===");
    const start = Date.now();
    
    const [result1, result2, result3] = await Promise.all([
        fetchData(),
        fetchData(),
        fetchData()
    ]);
    
    const duration = Date.now() - start;
    console.log(`Parallel took ${duration}ms`);
}

// Uncomment to test in console:
// sequentialDemo();
// parallelDemo();

// ============================================
// EVENT LISTENER
// ============================================
loadBtn.addEventListener('click', handleLoadData);

// ============================================
// DEMO: Async function returns a Promise
// ============================================
async function example() {
    return "Hello";
}

// This is the same as:
function examplePromise() {
    return Promise.resolve("Hello");
}

example().then(result => console.log(result));  // "Hello"