// ============================================
// DELAYED NOTIFICATION SYSTEM
// Demonstrating: Promise, loading states, error handling
// ============================================

const loadBtn = document.getElementById('load-data-btn');
const notificationIcon = document.getElementById('notification-icon');
const notificationMessage = document.getElementById('notification-message');

// ============================================
// SIMULATE API CALL WITH PROMISE
// ============================================
function fetchData() {
    return new Promise((resolve, reject) => {
        // Simulate network delay (2 seconds)
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
// HANDLE LOAD DATA (USING PROMISE)
// ============================================
function handleLoadData() {
    setLoadingState();
    
    fetchData()
        .then((data) => {
            setSuccessState(data);
        })
        .catch((error) => {
            setErrorState(error);
        });
}

// ============================================
// EVENT LISTENER
// ============================================
loadBtn.addEventListener('click', handleLoadData);

// ============================================
// DEMO: PROMISE CHAINING EXAMPLE (Console)
// ============================================
console.log("=== Promise Chaining Example ===");

function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: 1, name: "Victor" }), 500);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ title: "Post 1" }, { title: "Post 2" }]), 500);
    });
}

fetchUser()
    .then(user => {
        console.log("User:", user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
    })
    .catch(error => {
        console.error("Error:", error);
    });