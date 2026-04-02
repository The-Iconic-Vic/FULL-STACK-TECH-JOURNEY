# 📘 Form Validation Reference

## HTML5 Validation Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `required` | Field must be filled | `<input required>` |
| `minlength` | Minimum characters | `<input minlength="3">` |
| `maxlength` | Maximum characters | `<input maxlength="20">` |
| `min` | Minimum numeric value | `<input min="18">` |
| `max` | Maximum numeric value | `<input max="99">` |
| `step` | Valid number step | `<input step="5">` |
| `pattern` | Regex pattern match | `<input pattern="[A-Za-z]+">` |
| `type` | Built-in validation | `<input type="email">` |

---

## Built-in Validation by Type

| Type | Validates |
|------|-----------|
| `email` | Format: name@domain.com |
| `url` | Format: https://domain.com |
| `number` | Numeric value |
| `date` | Valid date format |
| `tel` | No automatic validation (use pattern) |

---

## Pattern Examples

```html
<!-- US Phone Number -->
<input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890">

<!-- 10-digit phone (no hyphens) -->
<input pattern="[0-9]{10}" placeholder="1234567890">

<!-- Postal Code (US) -->
<input pattern="[0-9]{5}" placeholder="12345">

<!-- Username (letters, numbers, underscore, 3-16 chars) -->
<input pattern="[A-Za-z0-9_]{3,16}" placeholder="username_123">

<!-- Password (at least one letter and one number) -->
<input pattern="(?=.*[A-Za-z])(?=.*[0-9]).{6,}" placeholder="password123">

<!-- Website URL -->
<input pattern="https?://.+" placeholder="https://example.com">

<!-- Time (HH:MM 24-hour) -->
<input pattern="([01][0-9]|2[0-3]):[0-5][0-9]" placeholder="14:30">
Validation Pseudo-classes
Pseudo-class	Description
:valid	Input value is valid
:invalid	Input value is invalid
:required	Field has required attribute
:optional	Field does not have required
:in-range	Value within min/max
:out-of-range	Value outside min/max
:read-only	Field is read-only
:read-write	Field is editable
Styling Validation States
css
/* Base input styles */
input, select, textarea {
    border: 2px solid #e0e0e0;
    padding: 0.75rem;
    border-radius: 8px;
    transition: border-color 0.3s ease;
}

/* Valid state - green border */
input:valid, select:valid, textarea:valid {
    border-color: #28a745;
}

/* Invalid state - red border */
input:invalid:not(:placeholder-shown),
select:invalid:not(:placeholder-shown),
textarea:invalid:not(:placeholder-shown) {
    border-color: #dc3545;
}

/* Required field indicator */
label.required::after {
    content: " *";
    color: #dc3545;
}

/* Error message (hidden by default) */
.error-message {
    display: none;
    color: #dc3545;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

/* Show error message when input is invalid */
input:invalid:not(:placeholder-shown) + .error-message,
select:invalid:not(:placeholder-shown) + .error-message,
textarea:invalid:not(:placeholder-shown) + .error-message {
    display: block;
}

/* Success message */
.valid-feedback {
    display: none;
    color: #28a745;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

/* Show success when input is valid and has content */
input:valid:not(:placeholder-shown) ~ .valid-feedback,
select:valid:not(:placeholder-shown) ~ .valid-feedback,
textarea:valid:not(:placeholder-shown) ~ .valid-feedback {
    display: block;
}
Form-level Validation Styling
css
/* Submit button styling based on form validity */

/* Button disabled when form is invalid */
form:invalid .submit-btn {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
    pointer-events: none;
}

/* Button enabled when form is valid */
form:valid .submit-btn {
    background: #28a745;
    cursor: pointer;
    pointer-events: auto;
}

form:valid .submit-btn:hover {
    background: #218838;
    transform: translateY(-2px);
}
Custom Validation Messages
HTML5 validation messages cannot be fully styled, but you can use the title attribute to provide a custom message:

html
<input type="text" required pattern="[A-Za-z]+" title="Please enter letters only (no numbers)">
Constraint Validation API (JavaScript)
While Day 10 focuses on CSS-only validation, here's a preview of JavaScript validation for future reference:

javascript
// Check validity
const input = document.getElementById('myInput');
if (input.checkValidity()) {
    // Input is valid
} else {
    // Input is invalid
    console.log(input.validationMessage);
}

// Set custom message
input.setCustomValidity('Please enter a valid value');
Validation Summary
Validation Type	Method	Styling
Required	required	:required, :invalid
Min/Max length	minlength, maxlength	:invalid
Min/Max number	min, max	:out-of-range
Pattern	pattern	:invalid
Type	type="email", etc.	:invalid