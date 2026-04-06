// ============================================
// SHOPPING LIST MANAGER
// Demonstrating: push(), pop(), forEach(), length
// ============================================

// Array to store shopping items
let shoppingItems = [];

// DOM Elements
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const removeLastBtn = document.getElementById('remove-last-btn');
const shoppingListUl = document.getElementById('shopping-list');
const itemCountSpan = document.getElementById('item-count');

// ============================================
// FUNCTION: Display all items using forEach()
// ============================================
function displayItems() {
    // Clear the list
    shoppingListUl.innerHTML = '';
    
    // Check if array is empty
    if (shoppingItems.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No items yet. Add some!';
        shoppingListUl.appendChild(emptyLi);
        itemCountSpan.textContent = '0';
        return;
    }
    
    // Loop through array using forEach()
    shoppingItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'shopping-item';
        
        const numberSpan = document.createElement('span');
        numberSpan.className = 'item-number';
        numberSpan.textContent = index + 1;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'item-text';
        textSpan.textContent = item;
        
        li.appendChild(numberSpan);
        li.appendChild(textSpan);
        shoppingListUl.appendChild(li);
    });
    
    // Update item count using .length property
    itemCountSpan.textContent = shoppingItems.length;
}

// ============================================
// FUNCTION: Add item using push()
// ============================================
function addItem() {
    const newItem = itemInput.value.trim();
    
    if (newItem === '') {
        alert('Please enter an item!');
        return;
    }
    
    // Add to end of array using push()
    shoppingItems.push(newItem);
    
    // Clear input
    itemInput.value = '';
    
    // Refresh display
    displayItems();
    
    // Focus back on input
    itemInput.focus();
}

// ============================================
// FUNCTION: Remove last item using pop()
// ============================================
function removeLastItem() {
    if (shoppingItems.length === 0) {
        alert('No items to remove!');
        return;
    }
    
    // Remove last item using pop()
    const removedItem = shoppingItems.pop();
    
    // Show feedback (optional)
    console.log(`Removed: ${removedItem}`);
    
    // Refresh display
    displayItems();
}

// ============================================
// EVENT LISTENERS
// ============================================
addBtn.addEventListener('click', addItem);
removeLastBtn.addEventListener('click', removeLastItem);

// Enter key support
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// ============================================
// INITIALIZATION
// ============================================
// Start with some example items
shoppingItems = ['Apples', 'Bread', 'Milk'];
displayItems();