// ============================================
// SEARCHABLE DROPDOWN
// Demonstrating: keydown events, event delegation, debouncing
// ============================================

// Country data
const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany",
    "France", "Spain", "Italy", "Japan", "China", "India", "Brazil",
    "Mexico", "Netherlands", "Sweden", "Norway", "Denmark", "Finland",
    "South Africa", "Nigeria", "Kenya", "Egypt", "Argentina", "Chile",
    "South Korea", "Singapore", "Malaysia", "Thailand", "Vietnam"
];

// DOM Elements
const searchInput = document.getElementById('search-input');
const dropdownList = document.getElementById('dropdown-list');
const selectedSpan = document.getElementById('selected-value');

// State
let filteredCountries = [...countries];
let highlightedIndex = -1;
let isDropdownOpen = false;

// ============================================
// RENDER FUNCTION (Event delegation)
// ============================================
function renderDropdown() {
    if (!isDropdownOpen || filteredCountries.length === 0) {
        if (filteredCountries.length === 0 && isDropdownOpen) {
            dropdownList.innerHTML = '<li class="no-results">No results found</li>';
            dropdownList.classList.add('show');
        } else {
            dropdownList.classList.remove('show');
        }
        return;
    }
    
    dropdownList.innerHTML = '';
    
    filteredCountries.forEach((country, index) => {
        const li = document.createElement('li');
        li.textContent = country;
        li.setAttribute('data-index', index);
        li.setAttribute('data-value', country);
        
        if (index === highlightedIndex) {
            li.classList.add('highlighted');
        }
        
        dropdownList.appendChild(li);
    });
    
    dropdownList.classList.add('show');
}

// ============================================
// FILTER FUNCTION (used by debounce)
// ============================================
function filterCountries(searchTerm) {
    if (searchTerm === '') {
        filteredCountries = [...countries];
    } else {
        const term = searchTerm.toLowerCase();
        filteredCountries = countries.filter(country =>
            country.toLowerCase().includes(term)
        );
    }
    
    // Reset highlighted index
    highlightedIndex = filteredCountries.length > 0 ? 0 : -1;
    
    renderDropdown();
}

// ============================================
// DEBOUNCE FUNCTION
// ============================================
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Create debounced search function
const debouncedSearch = debounce((searchTerm) => {
    filterCountries(searchTerm);
}, 300);

// ============================================
// SELECT ITEM
// ============================================
function selectItem(value) {
    selectedSpan.textContent = value;
    searchInput.value = value;
    isDropdownOpen = false;
    dropdownList.classList.remove('show');
    highlightedIndex = -1;
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function handleKeydown(e) {
    const key = e.key;
    
    // Arrow Down
    if (key === 'ArrowDown') {
        e.preventDefault();
        
        if (!isDropdownOpen) {
            isDropdownOpen = true;
            filterCountries(searchInput.value);
            return;
        }
        
        if (highlightedIndex < filteredCountries.length - 1) {
            highlightedIndex++;
            renderDropdown();
            scrollToHighlighted();
        }
    }
    
    // Arrow Up
    else if (key === 'ArrowUp') {
        e.preventDefault();
        
        if (!isDropdownOpen) {
            isDropdownOpen = true;
            filterCountries(searchInput.value);
            return;
        }
        
        if (highlightedIndex > 0) {
            highlightedIndex--;
            renderDropdown();
            scrollToHighlighted();
        }
    }
    
    // Enter
    else if (key === 'Enter') {
        e.preventDefault();
        
        if (isDropdownOpen && highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
            selectItem(filteredCountries[highlightedIndex]);
        }
    }
    
    // Escape
    else if (key === 'Escape') {
        e.preventDefault();
        isDropdownOpen = false;
        dropdownList.classList.remove('show');
        highlightedIndex = -1;
    }
}

function scrollToHighlighted() {
    const highlighted = dropdownList.querySelector('.highlighted');
    if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Input event with debouncing
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    
    if (!isDropdownOpen) {
        isDropdownOpen = true;
    }
    
    debouncedSearch(searchTerm);
});

// Focus event - open dropdown
searchInput.addEventListener('focus', () => {
    isDropdownOpen = true;
    filterCountries(searchInput.value);
});

// Click outside to close dropdown
document.addEventListener('click', (e) => {
    const container = document.querySelector('.dropdown-container');
    if (!container.contains(e.target)) {
        isDropdownOpen = false;
        dropdownList.classList.remove('show');
        highlightedIndex = -1;
    }
});

// Keyboard navigation
searchInput.addEventListener('keydown', handleKeydown);

// Event delegation for dropdown item clicks
dropdownList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li && !li.classList.contains('no-results')) {
        const value = li.getAttribute('data-value');
        if (value) {
            selectItem(value);
            searchInput.blur();
        }
    }
});

// ============================================
// INITIALIZATION
// ============================================
// Initial render (not showing dropdown until user interacts)
filteredCountries = [...countries];