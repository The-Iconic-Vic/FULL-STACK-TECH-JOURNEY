// ============================================
// STUDENT RECORDS SYSTEM
// Demonstrating: Objects, Arrays of Objects, filter(), map()
// ============================================

// Array of student objects
let students = [
    { name: "Alice Johnson", grade: 92, age: 16 },
    { name: "Bob Smith", grade: 78, age: 17 },
    { name: "Charlie Brown", grade: 65, age: 15 },
    { name: "Diana Prince", grade: 88, age: 16 },
    { name: "Ethan Hunt", grade: 45, age: 17 }
];

// DOM Elements
const studentListUl = document.getElementById('student-list');
const totalCountSpan = document.getElementById('total-count');
const avgGradeSpan = document.getElementById('avg-grade');
const nameInput = document.getElementById('student-name');
const gradeInput = document.getElementById('student-grade');
const ageInput = document.getElementById('student-age');
const addBtn = document.getElementById('add-btn');
const showAllBtn = document.getElementById('show-all-btn');
const showHighGradeBtn = document.getElementById('show-high-grade-btn');
const showPassingBtn = document.getElementById('show-passing-btn');

// Current display mode
let currentDisplayMode = 'all';
let filteredStudents = [];

// ============================================
// HELPER FUNCTION: Get grade letter and class
// ============================================
function getGradeInfo(grade) {
    if (grade >= 90) return { letter: 'A', class: 'grade-a' };
    if (grade >= 80) return { letter: 'B', class: 'grade-b' };
    if (grade >= 70) return { letter: 'C', class: 'grade-c' };
    if (grade >= 60) return { letter: 'D', class: 'grade-d' };
    return { letter: 'F', class: 'grade-f' };
}

// ============================================
// FUNCTION: Calculate average grade using map() and reduce()
// ============================================
function calculateAverageGrade(studentArray) {
    if (studentArray.length === 0) return 0;
    
    // Using map() to extract grades, then reduce() to sum
    const totalGrades = studentArray.map(student => student.grade).reduce((sum, grade) => sum + grade, 0);
    return (totalGrades / studentArray.length).toFixed(1);
}

// ============================================
// FUNCTION: Update stats (total count, average grade)
// ============================================
function updateStats() {
    totalCountSpan.textContent = students.length;
    const avgGrade = calculateAverageGrade(students);
    avgGradeSpan.textContent = avgGrade;
}

// ============================================
// FUNCTION: Display students using forEach()
// ============================================
function displayStudents(studentsToShow) {
    // Clear the list
    studentListUl.innerHTML = '';
    
    // Check if array is empty
    if (studentsToShow.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No students to display.';
        studentListUl.appendChild(emptyLi);
        return;
    }
    
    // Loop through array using forEach()
    studentsToShow.forEach((student, index) => {
        const li = document.createElement('li');
        li.className = 'student-item';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'student-info';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'student-name';
        nameSpan.textContent = student.name;
        
        const gradeInfo = getGradeInfo(student.grade);
        const gradeSpan = document.createElement('span');
        gradeSpan.className = `student-grade ${gradeInfo.class}`;
        gradeSpan.textContent = `${student.grade}% (${gradeInfo.letter})`;
        
        const ageSpan = document.createElement('span');
        ageSpan.className = 'student-age';
        ageSpan.textContent = `Age: ${student.age}`;
        
        infoDiv.appendChild(nameSpan);
        infoDiv.appendChild(gradeSpan);
        infoDiv.appendChild(ageSpan);
        
        li.appendChild(infoDiv);
        studentListUl.appendChild(li);
    });
}

// ============================================
// FUNCTION: Refresh display
// ============================================
function refreshDisplay() {
    if (currentDisplayMode === 'all') {
        displayStudents(students);
    } else {
        displayStudents(filteredStudents);
    }
    updateStats();
}

// ============================================
// FUNCTION: Add new student using push()
// ============================================
function addStudent() {
    const name = nameInput.value.trim();
    const grade = parseInt(gradeInput.value);
    const age = parseInt(ageInput.value);
    
    // Validation
    if (name === '') {
        alert('Please enter a student name!');
        return;
    }
    
    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert('Please enter a valid grade (0-100)!');
        return;
    }
    
    if (isNaN(age) || age < 5 || age > 100) {
        alert('Please enter a valid age!');
        return;
    }
    
    // Create new student object
    const newStudent = {
        name: name,
        grade: grade,
        age: age
    };
    
    // Add to array using push()
    students.push(newStudent);
    
    // Clear inputs
    nameInput.value = '';
    gradeInput.value = '';
    ageInput.value = '';
    
    // Reset to all view
    currentDisplayMode = 'all';
    
    // Refresh display
    refreshDisplay();
    
    // Focus back on name input
    nameInput.focus();
}

// ============================================
// FUNCTION: Show all students
// ============================================
function showAllStudents() {
    currentDisplayMode = 'all';
    refreshDisplay();
}

// ============================================
// FUNCTION: Show A students (grade >= 90) using filter()
// ============================================
function showHighGradeStudents() {
    // Using filter() to find students with grade >= 90
    filteredStudents = students.filter(student => student.grade >= 90);
    
    if (filteredStudents.length === 0) {
        alert('No A students found!');
        return;
    }
    
    currentDisplayMode = 'filtered';
    displayStudents(filteredStudents);
}

// ============================================
// FUNCTION: Show passing students (grade >= 75) using filter()
// ============================================
function showPassingStudents() {
    // Using filter() to find students with grade >= 75
    filteredStudents = students.filter(student => student.grade >= 75);
    
    if (filteredStudents.length === 0) {
        alert('No passing students found!');
        return;
    }
    
    currentDisplayMode = 'filtered';
    displayStudents(filteredStudents);
}

// ============================================
// EVENT LISTENERS
// ============================================
addBtn.addEventListener('click', addStudent);
showAllBtn.addEventListener('click', showAllStudents);
showHighGradeBtn.addEventListener('click', showHighGradeStudents);
showPassingBtn.addEventListener('click', showPassingStudents);

// Enter key support
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});
gradeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});
ageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// ============================================
// INITIALIZATION
// ============================================
refreshDisplay();