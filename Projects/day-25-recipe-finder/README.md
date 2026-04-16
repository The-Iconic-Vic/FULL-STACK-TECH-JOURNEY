# Recipe Finder - Day 25 Project

## Project Overview
A recipe finder application that searches recipes by ingredient using TheMealDB API, with filtering, modal details, and responsive design.

## Skills Practiced
- `fetch()` - Get data from external API
- `map()` - Create recipe cards from API data
- `filter()` - Filter by cuisine/area
- Event delegation - Click handlers for dynamic cards
- Modal dialog - Display detailed recipe information
- Loading states - Visual feedback during API calls

## File Structure
day-25-recipe-finder/
├── index.html
├── style.css
├── script.js
└── README.md

text

## API Used
| API | Endpoint | Description |
|-----|----------|-------------|
| TheMealDB | `/filter.php?i={ingredient}` | Search by ingredient |
| TheMealDB | `/lookup.php?i={id}` | Get full recipe details |

## Features

| Feature | Implementation |
|---------|----------------|
| Search by ingredient | Fetch recipes matching ingredient |
| Display recipe cards | `map()` to generate HTML |
| Filter by cuisine | Area filter (requires additional API calls) |
| View details | Modal with full recipe information |
| Loading spinner | Visual feedback during API calls |

## Key Code Patterns

```javascript
// map() to create recipe cards
const recipesHTML = recipes.map(recipe => `
    <div class="recipe-card" data-id="${recipe.idMeal}">
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>${recipe.strMeal}</h3>
    </div>
`).join('');

// Event delegation for dynamic cards
document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
        fetchRecipeDetails(card.dataset.id);
    });
});
API Data Flow
User enters ingredient

Fetch recipe list from /filter.php?i={ingredient}

Display recipe cards

User clicks a card

Fetch full details from /lookup.php?i={id}

Display modal with ingredients, instructions, video