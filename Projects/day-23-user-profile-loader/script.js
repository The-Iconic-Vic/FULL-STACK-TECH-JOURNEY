// ============================================
// USER PROFILE LOADER
// Demonstrating: async/await, Promise.all(), parallel execution
// ============================================

const loadBtn = document.getElementById('load-profile-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const profileContainer = document.getElementById('profile-container');
const profileInfo = document.getElementById('profile-info');
const postsList = document.getElementById('posts-list');
const friendsList = document.getElementById('friends-list');
const timingInfo = document.getElementById('timing-info');

// ============================================
// SIMULATED API FUNCTIONS
// ============================================

// Fetch user profile (takes 1 second)
function fetchUserProfile() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Victor Innocent",
                email: "victor@example.com",
                memberSince: "2024",
                bio: "Full-stack developer on a 9-month journey"
            });
        }, 1000);
    });
}

// Fetch user posts (takes 1.5 seconds)
function fetchUserPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Day 23: Mastered Async/Await!", likes: 42 },
                { id: 2, title: "Building a Task Manager App", likes: 38 },
                { id: 3, title: "Why I'm Learning in Public", likes: 56 }
            ]);
        }, 1500);
    });
}

// Fetch user friends (takes 1 second)
function fetchUserFriends() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Alice Johnson" },
                { id: 2, name: "Bob Smith" },
                { id: 3, name: "Charlie Brown" }
            ]);
        }, 1000);
    });
}

// ============================================
// ASYNC FUNCTION USING Promise.all()
// ============================================
async function loadUserProfile() {
    const startTime = Date.now();
    
    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    profileContainer.classList.add('hidden');
    timingInfo.textContent = '';
    loadBtn.disabled = true;
    
    try {
        // Run ALL promises simultaneously with Promise.all()
        const [profile, posts, friends] = await Promise.all([
            fetchUserProfile(),
            fetchUserPosts(),
            fetchUserFriends()
        ]);
        
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        
        // Display profile data
        displayProfile(profile);
        displayPosts(posts);
        displayFriends(friends);
        
        // Show timing info
        timingInfo.textContent = `✅ All data loaded in ${duration} seconds (parallel execution)`;
        
        // Show profile container
        profileContainer.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error loading data:', error);
        timingInfo.textContent = '❌ Error loading user data. Please try again.';
    } finally {
        // Hide loading spinner
        loadingSpinner.classList.add('hidden');
        loadBtn.disabled = false;
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================
function displayProfile(profile) {
    profileInfo.innerHTML = `
        <h2>${profile.name}</h2>
        <p>✉️ ${profile.email}</p>
        <p>📅 Member since ${profile.memberSince}</p>
        <p>📝 ${profile.bio}</p>
    `;
}

function displayPosts(posts) {
    postsList.innerHTML = posts.map(post => `
        <li>📌 ${post.title} <span style="color: #667eea;">❤️ ${post.likes} likes</span></li>
    `).join('');
}

function displayFriends(friends) {
    friendsList.innerHTML = friends.map(friend => `
        <li>👤 ${friend.name}</li>
    `).join('');
}

// ============================================
// DEMO: Sequential vs Parallel Comparison
// ============================================
async function sequentialLoad() {
    console.log("=== Sequential Loading (SLOWER) ===");
    const start = Date.now();
    
    const profile = await fetchUserProfile();
    const posts = await fetchUserPosts();
    const friends = await fetchUserFriends();
    
    const duration = (Date.now() - start) / 1000;
    console.log(`Sequential took ${duration} seconds`);
    // Takes ~3.5 seconds
}

async function parallelLoad() {
    console.log("=== Parallel Loading (FASTER) ===");
    const start = Date.now();
    
    const [profile, posts, friends] = await Promise.all([
        fetchUserProfile(),
        fetchUserPosts(),
        fetchUserFriends()
    ]);
    
    const duration = (Date.now() - start) / 1000;
    console.log(`Parallel took ${duration} seconds`);
    // Takes ~1.5 seconds
}

// Uncomment to test in console:
// sequentialLoad();
// parallelLoad();

// ============================================
// EVENT LISTENER
// ============================================
loadBtn.addEventListener('click', loadUserProfile);