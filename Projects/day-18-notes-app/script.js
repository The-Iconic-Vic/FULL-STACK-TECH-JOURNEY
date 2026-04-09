// ============================================
// NOTES APP WITH LOCALSTORAGE
// Demonstrating: create, edit, delete, search, save to localStorage
// ============================================

// DOM Elements
const searchInput = document.getElementById('search-input');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const saveBtn = document.getElementById('save-note-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const notesList = document.getElementById('notes-list');
const noteCountSpan = document.getElementById('note-count');
const lastSavedSpan = document.getElementById('last-saved');
const clearAllBtn = document.getElementById('clear-all-notes-btn');

// Notes array
let notes = [];
let editId = null;  // null = adding new note, number = editing existing note

// ============================================
// LOCALSTORAGE FUNCTIONS
// ============================================

function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
    lastSavedSpan.textContent = new Date().toLocaleTimeString();
}

function loadFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    } else {
        // Default demo notes for first visit
        notes = [
            {
                id: 1,
                title: 'Welcome to Notes App',
                content: 'Create, edit, and delete notes. All notes are saved automatically!',
                timestamp: Date.now()
            },
            {
                id: 2,
                title: 'Search Feature',
                content: 'Use the search bar to filter notes by title.',
                timestamp: Date.now() - 86400000
            }
        ];
        saveToLocalStorage();
    }
    renderNotes();
}

function clearAllNotes() {
    if (confirm('Delete ALL notes? This cannot be undone.')) {
        notes = [];
        saveToLocalStorage();
        renderNotes();
        clearForm();
    }
}

// ============================================
// RENDER NOTES (with search filter)
// ============================================
function renderNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm)
    );
    
    noteCountSpan.textContent = filteredNotes.length;
    
    if (filteredNotes.length === 0) {
        notesList.innerHTML = '<div class="empty-message">No notes found.</div>';
        return;
    }
    
    notesList.innerHTML = '';
    filteredNotes.forEach(note => {
        const noteCard = createNoteCard(note);
        notesList.appendChild(noteCard);
    });
}

function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    if (editId === note.id) card.classList.add('selected');
    
    const title = document.createElement('div');
    title.className = 'note-title';
    title.textContent = note.title;
    
    const preview = document.createElement('div');
    preview.className = 'note-preview';
    preview.textContent = note.content.substring(0, 60) + (note.content.length > 60 ? '...' : '');
    
    const date = document.createElement('div');
    date.className = 'note-date';
    date.textContent = new Date(note.timestamp).toLocaleDateString();
    
    const actions = document.createElement('div');
    actions.className = 'note-actions';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-note-btn';
    editBtn.textContent = '✏️ Edit';
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadNoteToForm(note.id);
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-note-btn';
    deleteBtn.textContent = '🗑️ Delete';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteNote(note.id);
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    card.appendChild(title);
    card.appendChild(preview);
    card.appendChild(date);
    card.appendChild(actions);
    
    // Click card to load note
    card.addEventListener('click', () => {
        loadNoteToForm(note.id);
    });
    
    return card;
}

// ============================================
// CRUD OPERATIONS
// ============================================
function saveNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (title === '') {
        alert('Please enter a title!');
        return;
    }
    
    if (editId === null) {
        // Create new note
        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            timestamp: Date.now()
        };
        notes.push(newNote);
    } else {
        // Update existing note
        const noteIndex = notes.findIndex(n => n.id === editId);
        if (noteIndex !== -1) {
            notes[noteIndex] = {
                ...notes[noteIndex],
                title: title,
                content: content,
                timestamp: Date.now()
            };
        }
    }
    
    saveToLocalStorage();
    clearForm();
    renderNotes();
}

function loadNoteToForm(id) {
    const note = notes.find(n => n.id === id);
    if (note) {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        editId = note.id;
        saveBtn.textContent = 'Update Note';
        renderNotes();  // Re-render to show selected card
        noteTitle.focus();
    }
}

function deleteNote(id) {
    if (confirm('Delete this note?')) {
        notes = notes.filter(n => n.id !== id);
        if (editId === id) clearForm();
        saveToLocalStorage();
        renderNotes();
    }
}

function clearForm() {
    noteTitle.value = '';
    noteContent.value = '';
    editId = null;
    saveBtn.textContent = 'Save Note';
    renderNotes();
}

// ============================================
// SEARCH FUNCTION (debounced)
// ============================================
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedSearch = debounce(() => renderNotes(), 300);

searchInput.addEventListener('input', debouncedSearch);

// ============================================
// EVENT LISTENERS
// ============================================
saveBtn.addEventListener('click', saveNote);
cancelEditBtn.addEventListener('click', clearForm);
clearAllBtn.addEventListener('click', clearAllNotes);

// Enter key in title field saves note
noteTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveNote();
});

// ============================================
// INITIALIZATION
// ============================================
loadFromLocalStorage();