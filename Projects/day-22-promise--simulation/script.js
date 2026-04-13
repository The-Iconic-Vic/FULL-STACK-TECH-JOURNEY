// ============================================
// PROMISE SIMULATION
// Demonstrating: Promise creation, .then(), .catch(), chaining
// ============================================

// ============================================
// BASIC PROMISE
// ============================================
function basicPromise() {
    return new Promise((resolve, reject) => {
        // Simulate async task (2 seconds)
        setTimeout(() => {
            const success = true;
            if (success) {
                resolve("✅ Task completed successfully!");
            } else {
                reject("❌ Task failed!");
            }
        }, 2000);
    });
}

document.getElementById('basic-promise-btn').addEventListener('click', () => {
    const output = document.getElementById('basic-output');
    output.textContent = "⏳ Loading... Please wait";
    output.className = "output loading";
    
    basicPromise()
        .then((message) => {
            output.textContent = message;
            output.className = "output success";
        })
        .catch((error) => {
            output.textContent = error;
            output.className = "output error";
        });
});

// ============================================
// PROMISE CHAINING
// ============================================
function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Step 1: Data fetched");
        }, 1000);
    });
}

function step2(previousResult) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${previousResult} → Step 2: Data processed`);
        }, 1000);
    });
}

function step3(previousResult) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${previousResult} → Step 3: Data saved`);
        }, 1000);
    });
}

document.getElementById('chain-promise-btn').addEventListener('click', () => {
    const output = document.getElementById('chain-output');
    output.textContent = "⏳ Starting chain...";
    output.className = "output loading";
    
    step1()
        .then((result) => {
            output.textContent = result;
            return step2(result);
        })
        .then((result) => {
            output.textContent = result;
            return step3(result);
        })
        .then((result) => {
            output.textContent = result;
            output.className = "output success";
        })
        .catch((error) => {
            output.textContent = `❌ Error: ${error}`;
            output.className = "output error";
        });
});

// ============================================
// PROMISE WITH RANDOM ERROR
// ============================================
function randomErrorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.3) {  // 70% success rate
                resolve("✅ Data loaded successfully!");
            } else {
                reject("❌ Network error: Failed to load data");
            }
        }, 2000);
    });
}

document.getElementById('error-promise-btn').addEventListener('click', () => {
    const output = document.getElementById('error-output');
    output.textContent = "⏳ Fetching data... (70% success rate)";
    output.className = "output loading";
    
    randomErrorPromise()
        .then((message) => {
            output.textContent = message;
            output.className = "output success";
        })
        .catch((error) => {
            output.textContent = error;
            output.className = "output error";
        });
});