# 📘 DOM Create Elements Reference

## Creating Elements

### document.createElement()
Creates a new HTML element in memory (not yet in DOM).

```javascript
// Basic creation
const div = document.createElement('div');
const p = document.createElement('p');
const button = document.createElement('button');
const span = document.createElement('span');
const li = document.createElement('li');
const a = document.createElement('a');
const img = document.createElement('img');
const input = document.createElement('input');
const ul = document.createElement('ul');
const form = document.createElement('form');

// Element exists but not visible until added to DOM
console.log(div);  // <div></div>
Setting Content
textContent (Recommended for text)
Sets plain text content. Escapes HTML (safe from XSS).

javascript
const p = document.createElement('p');
p.textContent = 'Hello World';
// <p>Hello World</p>

p.textContent = '<strong>Bold</strong>';
// Shows "<strong>Bold</strong>" as literal text (not rendered as HTML)

// Getting text
const text = p.textContent;

// Appending text
p.textContent += ' More text';
innerHTML
Sets HTML content. Parses HTML tags (XSS risk with user input).

javascript
const div = document.createElement('div');
div.innerHTML = '<h1>Title</h1><p>Description</p>';
// <div><h1>Title</h1><p>Description</p></div>

// WARNING: XSS vulnerability with user input
// div.innerHTML = userInput;  // DANGEROUS!

// Getting HTML
const html = div.innerHTML;

// Appending HTML
div.innerHTML += '<span>More</span>';
innerText
Similar to textContent but respects CSS styling and triggers reflow.

javascript
const p = document.createElement('p');
p.innerText = 'Hello World';
// <p>Hello World</p>

// Difference: innerText is aware of styling (slower)
// textContent is faster and doesn't trigger reflow
Setting Attributes
setAttribute() / getAttribute()
javascript
const img = document.createElement('img');

// Set attributes
img.setAttribute('src', 'image.jpg');
img.setAttribute('alt', 'Description');
img.setAttribute('data-id', '123');
img.setAttribute('class', 'my-image');

// Get attributes
const src = img.getAttribute('src');     // 'image.jpg'
const dataId = img.getAttribute('data-id'); // '123'

// Check if attribute exists
if (img.hasAttribute('alt')) {
    console.log('Has alt text');
}

// Remove attribute
img.removeAttribute('alt');
Direct Property Access (Shorter)
javascript
const img = document.createElement('img');
img.src = 'image.jpg';
img.alt = 'Description';
img.id = 'main-image';
img.className = 'my-image';

// Boolean attributes
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = true;
checkbox.disabled = false;
classList (Best for classes)
javascript
const div = document.createElement('div');

// Add class
div.classList.add('container');
div.classList.add('active', 'highlight');

// Remove class
div.classList.remove('inactive');

// Toggle class
div.classList.toggle('expanded');

// Check if class exists
if (div.classList.contains('active')) {
    console.log('Is active');
}

// Replace class
div.classList.replace('old-class', 'new-class');
dataset (for data-* attributes)
javascript
const div = document.createElement('div');

// Set data attributes
div.dataset.id = '123';
div.dataset.userRole = 'admin';
div.dataset.itemIndex = '5';

// HTML becomes: <div data-id="123" data-user-role="admin" data-item-index="5"></div>

// Get data attributes
const id = div.dataset.id;        // '123'
const role = div.dataset.userRole; // 'admin'

// data-user-role becomes dataset.userRole (camelCase)
Styling Elements
style Property
javascript
const div = document.createElement('div');

// Individual styles (camelCase)
div.style.backgroundColor = '#f0f0f0';
div.style.color = 'blue';
div.style.fontSize = '16px';
div.style.padding = '10px';
div.style.marginTop = '20px';
div.style.border = '1px solid #ccc';
div.style.borderRadius = '8px';

// Multiple styles at once (cssText)
div.style.cssText = 'background: #f0f0f0; color: blue; padding: 10px;';

// Getting computed styles
const styles = getComputedStyle(div);
const bgColor = styles.backgroundColor;
Adding to DOM
appendChild()
Adds a node as the last child of a parent.

javascript
const parent = document.getElementById('parent');
const child = document.createElement('div');
child.textContent = 'I am a child';

parent.appendChild(child);

// Returns the appended node
const appended = parent.appendChild(child);

// Can only append one node at a time
prepend()
Adds a node as the first child of a parent.

javascript
const parent = document.getElementById('parent');
const firstChild = document.createElement('div');
firstChild.textContent = 'I am first';

parent.prepend(firstChild);
append() (Modern)
Adds multiple nodes or strings to the end.

javascript
const parent = document.getElementById('parent');

// Add multiple elements
const div1 = document.createElement('div');
const div2 = document.createElement('div');
parent.append(div1, div2);

// Add text directly
parent.append('Hello ', 'World');

// Mix elements and text
parent.append(div1, ' text ', div2);
prepend() (Modern)
Adds multiple nodes or strings to the beginning.

javascript
const parent = document.getElementById('parent');
parent.prepend('First text', element1, element2);
insertBefore()
Inserts a node before a reference node.

javascript
const parent = document.getElementById('parent');
const newNode = document.createElement('div');
const referenceNode = document.getElementById('reference');

parent.insertBefore(newNode, referenceNode);

// Insert at beginning
parent.insertBefore(newNode, parent.firstChild);

// Insert at end
parent.insertBefore(newNode, null);
insertAdjacentElement()
Inserts an element at specific position.

javascript
const target = document.getElementById('target');
const newElement = document.createElement('div');

// Positions:
// 'beforebegin' - Before target itself
// 'afterbegin' - Inside target, as first child
// 'beforeend' - Inside target, as last child
// 'afterend' - After target itself

target.insertAdjacentElement('beforebegin', newElement);
target.insertAdjacentElement('afterbegin', newElement);
target.insertAdjacentElement('beforeend', newElement);
target.insertAdjacentElement('afterend', newElement);
insertAdjacentHTML()
Inserts HTML string at specific position (faster for HTML strings).

javascript
const target = document.getElementById('target');

target.insertAdjacentHTML('beforebegin', '<div>Before</div>');
target.insertAdjacentHTML('afterbegin', '<span>First child</span>');
target.insertAdjacentHTML('beforeend', '<span>Last child</span>');
target.insertAdjacentHTML('afterend', '<div>After</div>');
insertAdjacentText()
Inserts text at specific position.

javascript
const target = document.getElementById('target');
target.insertAdjacentText('beforebegin', 'Text before');
target.insertAdjacentText('afterbegin', 'First text');
target.insertAdjacentText('beforeend', 'Last text');
target.insertAdjacentText('afterend', 'Text after');
Complete Example: Building a Card
javascript
function createCard(title, description, imageUrl) {
    // Create container
    const card = document.createElement('div');
    card.className = 'card';
    
    // Create image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    img.className = 'card-image';
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'card-content';
    
    // Create title
    const titleEl = document.createElement('h3');
    titleEl.className = 'card-title';
    titleEl.textContent = title;
    
    // Create description
    const descEl = document.createElement('p');
    descEl.className = 'card-description';
    descEl.textContent = description;
    
    // Create button
    const button = document.createElement('button');
    button.className = 'card-button';
    button.textContent = 'Learn More';
    
    // Assemble
    content.appendChild(titleEl);
    content.appendChild(descEl);
    content.appendChild(button);
    
    card.appendChild(img);
    card.appendChild(content);
    
    return card;
}

// Usage
const container = document.getElementById('cards-container');
const card = createCard('My Title', 'Description here', 'image.jpg');
container.appendChild(card);