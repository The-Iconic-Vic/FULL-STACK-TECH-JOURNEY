# Searchable Dropdown - Day 20 Project

## Project Overview
A searchable dropdown component with keyboard navigation (arrow keys, Enter, Escape) and debounced search.

## Skills Practiced
- `keydown` event - Detect arrow keys, Enter, Escape
- `input` event - Debounced search filtering
- `preventDefault()` - Prevent arrow key page scrolling
- Event delegation - Handle clicks on dynamic list items
- Debouncing - Optimize search performance
- Focus/blur handling - Open/close dropdown

## File Structure
day-20-searchable-dropdown/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Keyboard Events Used

| Event | Purpose |
|-------|---------|
| `ArrowDown` | Navigate to next item |
| `ArrowUp` | Navigate to previous item |
| `Enter` | Select highlighted item |
| `Escape` | Close dropdown |

## Features

| Feature | Description |
|---------|-------------|
| Search | Type to filter countries |
| Arrow navigation | Up/down to navigate options |
| Enter selection | Select highlighted item |
| Escape | Close dropdown |
| Click outside | Close dropdown |
| Highlighted item | Visual feedback for current selection |
| Debounced search | Optimizes performance |

## Key Code Patterns

```javascript
// Debounced search
const debouncedSearch = debounce((term) => {
    filterCountries(term);
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Keyboard navigation
function handleKeydown(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIndex++;
        renderDropdown();
    } else if (e.key === 'Enter') {
        selectItem(filteredCountries[highlightedIndex]);
    }
}

// Event delegation for dynamic items
dropdownList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) selectItem(li.textContent);
});