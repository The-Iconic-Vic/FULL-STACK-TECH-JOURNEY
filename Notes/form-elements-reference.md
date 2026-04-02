# 📘 Form Elements Reference

## The `<form>` Element

The container for all form controls.

```html
<form action="/submit-url" method="post">
    <!-- form elements -->
</form>
Attribute	Values	Description
action	URL	Where to send form data
method	get, post	HTTP method
novalidate	boolean	Disables browser validation
target	_blank, _self, etc.	Where to show response
Input Types
Text Inputs
Type	Description	HTML
text	Single line text	<input type="text">
email	Email address (validates)	<input type="email">
tel	Telephone number	<input type="tel">
url	Website URL (validates)	<input type="url">
password	Masked text	<input type="password">
search	Search field	<input type="search">
html
<input type="text" name="username" placeholder="Enter username">
<input type="email" name="email" placeholder="your@email.com" required>
<input type="tel" name="phone" pattern="[0-9]{10}">
<input type="url" name="website" placeholder="https://example.com">
<input type="password" name="password" minlength="6">
<input type="search" name="search" aria-label="Search">
Numeric Inputs
Type	Description	HTML
number	Numeric value with stepper	<input type="number">
range	Slider control	<input type="range">
html
<input type="number" name="age" min="18" max="99" step="1">
<input type="range" name="volume" min="0" max="100" value="50">
Date/Time Inputs
Type	Description	HTML
date	Date picker (YYYY-MM-DD)	<input type="date">
datetime-local	Date and time	<input type="datetime-local">
month	Month picker	<input type="month">
week	Week picker	<input type="week">
time	Time picker	<input type="time">
html
<input type="date" name="birthday" min="1900-01-01" max="2020-12-31">
<input type="datetime-local" name="appointment">
<input type="month" name="month">
<input type="week" name="week">
<input type="time" name="time">
Selection Inputs
Type	Description	HTML
checkbox	Multiple selection	<input type="checkbox">
radio	Single selection	<input type="radio">
html
<!-- Checkboxes -->
<input type="checkbox" id="newsletter" name="newsletter" checked>
<label for="newsletter">Subscribe to newsletter</label>

<!-- Radio buttons (same name = group) -->
<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>
Other Inputs
Type	Description	HTML
color	Color picker	<input type="color">
file	File upload	<input type="file">
hidden	Hidden field	<input type="hidden">
html
<input type="color" name="favcolor" value="#ff0000">
<input type="file" name="avatar" accept="image/*">
<input type="hidden" name="user_id" value="12345">
<textarea>
Multi-line text input.

html
<textarea name="message" rows="5" cols="30" placeholder="Enter your message..."></textarea>
Attribute	Description
rows	Number of visible text lines
cols	Width in characters
maxlength	Maximum characters
wrap	soft, hard (text wrapping)
placeholder	Hint text
<select> and <option>
Dropdown menu.

html
<select name="country" required>
    <option value="">Select a country</option>
    <option value="ng">Nigeria</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
</select>
Attribute	Description
multiple	Allow multiple selections
size	Number of visible options
required	Selection required
Multiple selection:

html
<select name="hobbies" multiple size="3">
    <option value="reading">Reading</option>
    <option value="coding">Coding</option>
    <option value="gaming">Gaming</option>
</select>
Option groups:

html
<select name="car">
    <optgroup label="German Cars">
        <option value="bmw">BMW</option>
        <option value="mercedes">Mercedes</option>
    </optgroup>
    <optgroup label="Japanese Cars">
        <option value="toyota">Toyota</option>
        <option value="honda">Honda</option>
    </optgroup>
</select>
<datalist>
Autocomplete suggestions.

html
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>
<fieldset> and <legend>
Group related form elements.

html
<fieldset>
    <legend>Personal Information</legend>
    
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
</fieldset>

<!-- Disabled fieldset (disables all inner elements) -->
<fieldset disabled>
    <legend>Disabled Section</legend>
    <input type="text" name="disabled-field">
</fieldset>
<button>
Clickable button.

html
<!-- Submit button -->
<button type="submit">Submit</button>

<!-- Reset button -->
<button type="reset">Reset</button>

<!-- Regular button -->
<button type="button">Click Me</button>
Input Attributes Reference
Attribute	Description	Example
name	Field name for submission	name="username"
value	Default value	value="John"
placeholder	Hint text	placeholder="Enter name"
required	Field required	required
disabled	Field disabled	disabled
readonly	Read-only field	readonly
minlength	Min characters	minlength="3"
maxlength	Max characters	maxlength="20"
min	Min numeric value	min="18"
max	Max numeric value	max="99"
step	Increment step	step="5"
pattern	Regex validation	pattern="[A-Z]{3}"
autofocus	Focus on load	autofocus
autocomplete	Enable autocomplete	autocomplete="off"