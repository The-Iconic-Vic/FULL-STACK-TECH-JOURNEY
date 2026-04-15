# 📘 Public APIs List

## Free APIs for Practice (No API Key Required)

### Test/Fake Data APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| JSONPlaceholder | `https://jsonplaceholder.typicode.com` | Fake posts, users, comments |
| ReqRes | `https://reqres.in` | Fake user data for testing |
| DummyJSON | `https://dummyjson.com` | Products, carts, users |
| Typicode | `https://jsonplaceholder.typicode.com` | Same as JSONPlaceholder |

### Random Data APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| Random User | `https://randomuser.me/api/` | Random user profiles |
| Dog CEO | `https://dog.ceo/api/breeds/image/random` | Random dog images |
| Cat API | `https://api.thecatapi.com/v1/images/search` | Random cat images |
| Random Fox | `https://randomfox.ca/floof/` | Random fox images |
| Random Duck | `https://random-d.uk/api/random` | Random duck images |
| Useless Facts | `https://uselessfacts.jsph.pl/random.json` | Random facts |

### Quotes & Jokes APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| Quote API | `https://api.quotable.io/random` | Random quotes |
| Kanye Quotes | `https://api.kanye.rest` | Random Kanye quotes |
| Official Joke API | `https://official-joke-api.appspot.com/random_joke` | Random jokes |
| Chuck Norris | `https://api.chucknorris.io/jokes/random` | Chuck Norris jokes |

### Weather APIs

| API | Endpoint | Description | API Key? |
|-----|----------|-------------|----------|
| Open-Meteo | `https://api.open-meteo.com/v1/forecast` | Free weather | No |
| OpenWeather | `https://openweathermap.org/api` | Weather data | Yes (free) |
| WeatherAPI | `https://www.weatherapi.com` | Weather data | Yes (free) |

### Pokemon API

| API | Endpoint | Description |
|-----|----------|-------------|
| PokeAPI | `https://pokeapi.co/api/v2` | Pokemon data |
| Pokemon | `https://pokeapi.co/api/v2/pokemon/ditto` | Specific Pokemon |

### Space APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| SpaceX | `https://api.spacexdata.com/v4/launches` | SpaceX launches |
| NASA | `https://api.nasa.gov/planetary/apod` | NASA picture of day |

### Country APIs

| API | Endpoint | Description |
|-----|----------|-------------|
| Rest Countries | `https://restcountries.com/v3.1/all` | All countries |
| Country API | `https://countryapi.io` | Country data |

### Example Usage

```javascript
// Random User
async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
}

// Random Dog
async function getRandomDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
}

// Random Quote
async function getRandomQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data.content;
}

// Random Joke
async function getRandomJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    return `${data.setup} - ${data.punchline}`;
}

// Pokemon Data
async function getPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return {
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map(t => t.type.name)
    };
}
APIs Requiring API Keys (Free Tier)
API	Description	Sign Up
OpenWeatherMap	Weather data	openweathermap.org
NewsAPI	News articles	newsapi.org
The Movie DB	Movie data	themoviedb.org
YouTube API	YouTube data	developers.google.com/youtube
Spotify API	Music data	developer.spotify.com
API Key Pattern
javascript
// Most APIs use API key in headers or query params
const API_KEY = 'your_api_key_here';

// In headers
const response = await fetch('https://api.example.com/data', {
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Key': API_KEY
    }
});

// In query parameters
const response = await fetch(`https://api.example.com/data?api_key=${API_KEY}`);
Finding More APIs
Resource	Description	Link
Public APIs	Huge list of free APIs	https://github.com/public-apis/public-apis
API List	Curated API list	https://apilist.fun
RapidAPI	API marketplace	https://rapidapi.com
ProgrammableWeb	API directory	https://programmableweb.com
Testing APIs
Browser
javascript
// Just paste in console
fetch('https://randomuser.me/api/')
    .then(r => r.json())
    .then(d => console.log(d));
VS Code
Use Thunder Client or REST Client extensions

Command Line (cURL)
bash
curl https://randomuser.me/api/
Postman
Download from postman.com - great for API testing

Rate Limits
Most free APIs have rate limits:

API	Limit
JSONPlaceholder	Unlimited
Random User	Unlimited
Dog CEO	Unlimited
Quote API	Unlimited
OpenWeatherMap	60 calls/minute (free)
Handle rate limits:

javascript
async function rateLimitedFetch(url) {
    const response = await fetch(url);
    
    // Check rate limit headers
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');
    
    if (remaining === '0') {
        console.log(`Rate limit hit. Reset at ${new Date(reset * 1000)}`);
    }
    
    return response;
}