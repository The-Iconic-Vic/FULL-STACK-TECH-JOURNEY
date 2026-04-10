# 📘 Time Formatting Patterns

## Date Formatting Patterns

### YYYY-MM-DD (ISO Date)
```javascript
function formatISODate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// "2026-04-10"
MM/DD/YYYY (US)
javascript
function formatUSDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
// "04/10/2026"
DD/MM/YYYY (EU)
javascript
function formatEUDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
// "10/04/2026"
Month DD, YYYY (Full)
javascript
function formatFullDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}
// "April 10, 2026"
Weekday, Month DD, YYYY
javascript
function formatLongDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${dayName}, ${monthName} ${day}, ${year}`;
}
// "Friday, April 10, 2026"
Time Formatting Patterns
24-Hour Format (HH:MM:SS)
javascript
function formatTime24(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
// "14:30:25"
12-Hour Format (HH:MM:SS AM/PM)
javascript
function formatTime12(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}
// "2:30:25 PM"
Short Time (HH:MM)
javascript
function formatShortTime24(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
// "14:30"

function formatShortTime12(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    
    return `${hours}:${minutes} ${ampm}`;
}
// "2:30 PM"
Timer Display Patterns
Countdown Display (MM:SS)
javascript
function formatCountdown(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
// "01:30" for 90 seconds
Countdown Display (HH:MM:SS)
javascript
function formatCountdownLong(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
// "1:30:00" for 5400 seconds
Stopwatch Display (with milliseconds)
javascript
function formatStopwatch(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    if (hours > 0) {
        return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}
// "01:30.25" for 90.25 seconds
Relative Time Formatting
Time Ago
javascript
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
}
// "5 minutes ago", "2 hours ago", "3 days ago"
Human Readable Duration
javascript
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
}
// "1 hour, 30 minutes, 25 seconds"
Combined Date + Time
Date and Time (YYYY-MM-DD HH:MM:SS)
javascript
function formatDateTime(date) {
    return `${formatISODate(date)} ${formatTime24(date)}`;
}
// "2026-04-10 14:30:25"
Date and Time with Timezone
javascript
function formatDateTimeWithTimezone(date) {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offset) % 60).padStart(2, '0');
    
    return `${formatISODate(date)} ${formatTime24(date)} UTC${sign}${hours}:${minutes}`;
}
// "2026-04-10 14:30:25 UTC+01:00"
Month and Day Names
javascript
// Month names arrays
const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Day names arrays
const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Get month name
function getMonthName(date, format = 'full') {
    const months = format === 'full' ? monthsFull : monthsShort;
    return months[date.getMonth()];
}

// Get day name
function getDayName(date, format = 'full') {
    const days = format === 'full' ? daysFull : daysShort;
    return days[date.getDay()];
}
Using Intl.DateTimeFormat (Recommended for production)
javascript
// Using built-in Intl API (more robust)
const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
});
console.log(formatter.format(new Date()));
// "Friday, April 10, 2026 at 2:30:25 PM"

// Different locales
const usFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium'
});

const ukFormatter = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'medium'
});