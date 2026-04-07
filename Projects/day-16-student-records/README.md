# Student Records System - Day 16 Project

## Project Overview
A student records management system demonstrating JavaScript objects, arrays of objects, and array methods.

## Skills Practiced
- Creating objects with `{}` syntax
- Object properties (key-value pairs)
- Accessing properties with dot notation
- Arrays of objects
- `filter()` - find students by grade
- `map()` - extract grades for average calculation
- `reduce()` - sum grades
- `push()` - add new student

## File Structure
day-16-student-records/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Object Structure
```javascript
{
    name: "Alice Johnson",
    grade: 92,
    age: 16
}
Array Methods Used
Method	Purpose	Example
filter()	Find students by grade	students.filter(s => s.grade >= 90)
map()	Extract grades	students.map(s => s.grade)
reduce()	Sum grades	grades.reduce((sum, g) => sum + g, 0)
push()	Add new student	students.push(newStudent)
forEach()	Display students	students.forEach(s => { })
Key JavaScript Code
javascript
// Object creation
const student = {
    name: "Alice",
    grade: 92,
    age: 16
};

// Accessing properties (dot notation)
console.log(student.name);   // "Alice"
console.log(student.grade);  // 92

// Array of objects
let students = [
    { name: "Alice", grade: 92, age: 16 },
    { name: "Bob", grade: 78, age: 17 }
];

// Filter high grade students
const aStudents = students.filter(s => s.grade >= 90);

// Calculate average grade
const avg = students.map(s => s.grade).reduce((sum, g) => sum + g, 0) / students.length;

// Add new student
students.push({ name: "Charlie", grade: 85, age: 15 });


Features
Add new students with name, grade, age

View all students

Filter A students (grade ≥ 90)

Filter passing students (grade ≥ 75)

Real-time statistics (total count, average grade)

Grade-based color coding (A-F)

Responsive design