// ============================================
// WEATHER DASHBOARD
// Week 4 Capstone Project
// API: OpenWeatherMap
// ============================================

const API_KEY = 'ea73356a21ebed9fd1a6ab766a1a74f8'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geolocationBtn = document.getElementById('geolocation-btn');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');
const weatherContainer = document.getElementById('weather-container');
const recentSearchesDiv = document.getElementById('recent-searches');
const recentList = document.getElementById('recent-list');

// State
let currentTempUnit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit
let currentCity = 'London';
let recentCities = [];

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================
function loadRecentSearches() {
    const saved = localStorage.getItem('recentCities');
    if (saved) {
        recentCities = JSON.parse(saved);
        updateRecentUI();
    }
}

function saveRecentSearch(city) {
    // Remove if exists
    recentCities = recentCities.filter(c => c.toLowerCase() !== city.toLowerCase());
    // Add to front
    recentCities.unshift(city);
    // Keep only last 5
    recentCities = recentCities.slice(0, 5);
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    updateRecentUI();
}

function updateRecentUI() {
    if (recentCities.length > 0) {
        recentSearchesDiv.classList.remove('hidden');
        recentList.innerHTML = recentCities.map(city => 
            `<span class="recent-item" data-city="${city}">${city}</span>`
        ).join('');
        
        // Add click listeners
        document.querySelectorAll('.recent-item').forEach(item => {
            item.addEventListener('click', () => {
                cityInput.value = item.dataset.city;
                getWeather(item.dataset.city);
            });
        });
    } else {
        recentSearchesDiv.classList.add('hidden');
    }
}

// ============================================
// UI FUNCTIONS
// ============================================
function showLoading() {
    loadingDiv.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.classList.remove('hidden');
    errorDiv.textContent = message;
    weatherContainer.classList.add('hidden');
}

function showWeather(data) {
    weatherContainer.classList.remove('hidden');
    updateBackground(data.weather[0].main);
    displayCurrentWeather(data);
    displayForecast(data.coord.lat, data.coord.lon);
}

// ============================================
// BACKGROUND BASED ON WEATHER
// ============================================
function updateBackground(condition) {
    const body = document.body;
    const conditionLower = condition.toLowerCase();
    
    body.classList.remove('sunny', 'rainy', 'cloudy', 'snowy');
    
    if (conditionLower.includes('clear')) {
        body.classList.add('sunny');
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        body.classList.add('rainy');
    } else if (conditionLower.includes('cloud')) {
        body.classList.add('cloudy');
    } else if (conditionLower.includes('snow')) {
        body.classList.add('snowy');
    }
}

// ============================================
// API CALLS
// ============================================
async function getWeather(city) {
    showLoading();
    
    try {
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentTempUnit}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling.');
            }
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        showWeather(data);
        saveRecentSearch(city);
        currentCity = city;
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

async function getWeatherByCoords(lat, lon) {
    showLoading();
    
    try {
        const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentTempUnit}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        showWeather(data);
        saveRecentSearch(data.name);
        cityInput.value = data.name;
        currentCity = data.name;
        
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

async function getForecast(lat, lon) {
    try {
        const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentTempUnit}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch forecast');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Forecast error:', error);
        return null;
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================
function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-condition').textContent = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${iconCode}.png`;
    
    const temp = Math.round(data.main.temp);
    document.getElementById('temp-value').textContent = temp;
    
    const feelsLike = Math.round(data.main.feels_like);
    document.getElementById('feels-like').textContent = `${feelsLike}${currentTempUnit === 'metric' ? '°C' : '°F'}`;
    
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    
    const windSpeed = currentTempUnit === 'metric' 
        ? `${Math.round(data.wind.speed * 3.6)} km/h` 
        : `${Math.round(data.wind.speed)} mph`;
    document.getElementById('wind-speed').textContent = windSpeed;
    
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    document.getElementById('high-low').textContent = `${high}° / ${low}°`;
    
    // Sunrise/Sunset
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
}

async function displayForecast(lat, lon) {
    const forecastData = await getForecast(lat, lon);
    if (!forecastData) return;
    
    const forecastContainer = document.getElementById('forecast-container');
    
    // Group by day (get one forecast per day)
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });
    
    const days = Object.values(dailyForecasts).slice(0, 5);
    
    forecastContainer.innerHTML = days.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const condition = day.weather[0].main;
        
        return `
            <div class="forecast-card">
                <div class="forecast-day">${dayName}</div>
                <img class="forecast-icon" src="https://openweathermap.org/img/w/${icon}.png" alt="${condition}">
                <div class="forecast-temp">${temp}°</div>
                <div class="forecast-condition">${condition}</div>
            </div>
        `;
    }).join('');
}

// ============================================
// TEMPERATURE TOGGLE
// ============================================
function setUnit(unit) {
    currentTempUnit = unit;
    
    if (unit === 'metric') {
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
        document.getElementById('temp-unit').textContent = '°C';
    } else {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
        document.getElementById('temp-unit').textContent = '°F';
    }
    
    // Refresh weather with new unit
    if (currentCity) {
        getWeather(currentCity);
    }
}

// ============================================
// GEOLOCATION
// ============================================
function getGeolocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.error('Geolocation error:', error);
            showError('Unable to get your location. Please search for a city.');
            hideLoading();
        }
    );
}

// ============================================
// EVENT LISTENERS
// ============================================
searchBtn.addEventListener('click', () => getWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather(cityInput.value);
});
geolocationBtn.addEventListener('click', getGeolocation);
celsiusBtn.addEventListener('click', () => setUnit('metric'));
fahrenheitBtn.addEventListener('click', () => setUnit('imperial'));

// ============================================
// INITIALIZATION
// ============================================
loadRecentSearches();
getWeather('London');