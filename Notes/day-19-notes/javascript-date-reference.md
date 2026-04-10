# 📘 JavaScript Date Reference

## Creating Date Objects

```javascript
// Current date and time
const now = new Date();

// Specific date (year, month, day, hour, minute, second, ms)
const date1 = new Date(2026, 3, 10);           // April 10, 2026
const date2 = new Date(2026, 3, 10, 14, 30);   // April 10, 2026, 14:30
const date3 = new Date(2026, 3, 10, 14, 30, 25); // with seconds

// From date string
const date4 = new Date('2026-04-10');
const date5 = new Date('April 10, 2026');
const date6 = new Date('2026-04-10T14:30:00');

// From timestamp (milliseconds since Jan 1, 1970)
const date7 = new Date(1744300000000);

// Unix timestamp (seconds * 1000)
const unixSeconds = 1744300000;
const date8 = new Date(unixSeconds * 1000);
Important Note: Month Indexing
Months are 0-indexed in JavaScript!

javascript
// January = 0, February = 1, ..., December = 11
const jan = new Date(2026, 0, 1);   // January 1, 2026
const feb = new Date(2026, 1, 1);   // February 1, 2026
const dec = new Date(2026, 11, 1);  // December 1, 2026

// Common mistake
const april = new Date(2026, 4, 10);  // May 10, 2026 (not April!)
// Correct: April = month 3
const aprilCorrect = new Date(2026, 3, 10);
Getting Date Components
Method	Returns	Range	Description
getFullYear()	Number	4-digit	Year (e.g., 2026)
getMonth()	Number	0-11	Month (0 = January)
getDate()	Number	1-31	Day of month
getDay()	Number	0-6	Day of week (0 = Sunday)
getHours()	Number	0-23	Hour
getMinutes()	Number	0-59	Minute
getSeconds()	Number	0-59	Second
getMilliseconds()	Number	0-999	Millisecond
getTime()	Number	-	Milliseconds since epoch
getTimezoneOffset()	Number	-	Minutes from UTC
javascript
const now = new Date();

const year = now.getFullYear();        // 2026
const month = now.getMonth();          // 3 (April)
const date = now.getDate();            // 10
const day = now.getDay();              // 5 (Friday)
const hours = now.getHours();          // 14
const minutes = now.getMinutes();      // 30
const seconds = now.getSeconds();      // 25
const ms = now.getMilliseconds();      // 123
const timestamp = now.getTime();       // 1744300000000
const offset = now.getTimezoneOffset(); // -60 (minutes from UTC)
UTC Versions (Universal Time)
javascript
const now = new Date();

now.getUTCFullYear();
now.getUTCMonth();
now.getUTCDate();
now.getUTCDay();
now.getUTCHours();
now.getUTCMinutes();
now.getUTCSeconds();
now.getUTCMilliseconds();
Setting Date Components
Method	Description	Range
setFullYear(year)	Set year	4-digit
setMonth(month)	Set month	0-11
setDate(date)	Set day of month	1-31
setHours(hours)	Set hour	0-23
setMinutes(minutes)	Set minute	0-59
setSeconds(seconds)	Set second	0-59
setMilliseconds(ms)	Set millisecond	0-999
setTime(timestamp)	Set from timestamp	-
javascript
const date = new Date();

// Set individual components
date.setFullYear(2027);
date.setMonth(0);      // January
date.setDate(15);
date.setHours(10);
date.setMinutes(30);
date.setSeconds(0);
date.setMilliseconds(0);

// Chain setters
date.setFullYear(2027).setMonth(0).setDate(15);

// Set from timestamp
date.setTime(1744300000000);
Formatting Dates
Built-in String Methods
javascript
const now = new Date();

now.toString();           // "Fri Apr 10 2026 14:30:25 GMT+0100"
now.toDateString();       // "Fri Apr 10 2026"
now.toTimeString();       // "14:30:25 GMT+0100"
now.toISOString();        // "2026-04-10T13:30:25.000Z"
now.toUTCString();        // "Fri, 10 Apr 2026 13:30:25 GMT"
now.toLocaleDateString(); // "4/10/2026"
now.toLocaleTimeString(); // "2:30:25 PM"
toLocaleString with Options
javascript
const now = new Date();

// Date options
now.toLocaleDateString('en-US', {
    weekday: 'long',      // "Friday"
    year: 'numeric',      // "2026"
    month: 'long',        // "April"
    day: 'numeric'        // "10"
});
// "Friday, April 10, 2026"

// Time options
now.toLocaleTimeString('en-US', {
    hour: '2-digit',      // "02"
    minute: '2-digit',    // "30"
    second: '2-digit',    // "25"
    hour12: true          // PM/AM format
});
// "02:30:25 PM"

// Full options
now.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});
// "Fri, Apr 10, 2026, 02:30 PM"
Custom Formatting Functions
javascript
// Format as YYYY-MM-DD
function formatYMD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format as MM/DD/YYYY
function formatMDY(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Format time as HH:MM:SS
function formatTime24(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Format time as HH:MM:SS AM/PM
function formatTime12(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Format with month and day names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatLong(date) {
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${dayName}, ${monthName} ${day}, ${year}`;
}
Comparing Dates
javascript
const date1 = new Date('2026-04-10');
const date2 = new Date('2026-04-15');

// Direct comparison
console.log(date1 < date2);   // true
console.log(date1 > date2);   // false
console.log(date1 <= date2);  // true
console.log(date1 >= date2);  // false

// Equality (must use getTime)
console.log(date1 == date2);   // false (different objects)
console.log(date1.getTime() === date2.getTime()); // true if same

// Check if same day
function isSameDay(dateA, dateB) {
    return dateA.toDateString() === dateB.toDateString();
}

// Calculate difference
const diffMs = date2 - date1;  // milliseconds
const diffDays = diffMs / (1000 * 60 * 60 * 24);
const diffHours = diffMs / (1000 * 60 * 60);
const diffMinutes = diffMs / (1000 * 60);
Date Arithmetic
javascript
const today = new Date();

// Add days
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const tomorrow = addDays(today, 1);
const nextWeek = addDays(today, 7);
const lastWeek = addDays(today, -7);

// Add months
function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

// Add years
function addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

// Start of day
function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

// End of day
function endOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}
Useful Constants
javascript
// Time constants (in milliseconds)
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

// Usage
const oneHourLater = new Date(Date.now() + HOUR);
const oneDayLater = new Date(Date.now() + DAY);
Common Patterns
javascript
// Get age from birthdate
function getAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Check if date is today
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// Get days between two dates
function daysBetween(date1, date2) {
    const diffMs = Math.abs(date2 - date1);
    return Math.floor(diffMs / DAY);
}

// Get next occurrence of a day of week (0 = Sunday)
function getNextDayOfWeek(dayOfWeek, fromDate = new Date()) {
    const result = new Date(fromDate);
    const currentDay = result.getDay();
    const daysUntil = (dayOfWeek - currentDay + 7) % 7;
    result.setDate(result.getDate() + (daysUntil === 0 ? 7 : daysUntil));
    return result;
}
Browser Support
All modern browsers support the Date object fully. Some methods like toLocaleString options have been supported since ES2017.

javascript
// Check if toLocaleString options are supported
try {
    new Date().toLocaleString('en-US', { hour: '2-digit' });
    console.log('Full Date API supported');
} catch (e) {
    console.log('Fallback to basic Date methods');
}