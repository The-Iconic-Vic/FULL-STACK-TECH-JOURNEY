# Contact Form - Day 10 Project

## Project Overview
A complete contact form with real-time validation styling and submit button that only enables when form is valid.

## Skills Practiced
- Form validation with `:valid` and `:invalid` pseudo-classes
- Real-time validation feedback (green/red borders)
- Custom error messages and success indicators
- Submit button state based on form validity
- Radio buttons with fieldset
- CSS-only form validation (no JavaScript)

## File Structure
day-10-contact-form/
├── index.html
├── style.css
└── README.md

text

## Form Fields

| Field | Type | Validation |
|-------|------|------------|
| Name | text | Required, minlength=2 |
| Email | email | Required, email format |
| Subject | select | Required |
| Message | textarea | Required, minlength=10 |
| Priority | radio | Optional (default: Low) |

## Validation Features

| Feature | Implementation |
|---------|----------------|
| Required field indicator | `label::after` with asterisk |
| Green border | `:valid` pseudo-class |
| Red border | `:invalid:not(:placeholder-shown)` |
| Error message | Shows when input is invalid |
| Success message | Shows when input is valid |
| Submit button enabled | `form:valid .submit-btn` |
| Submit button disabled | `form:invalid .submit-btn` |

## Key CSS Techniques

```css
/* Button enabled only when form is valid */
form:valid .submit-btn {
    background: #28a745;
    cursor: pointer;
}

form:invalid .submit-btn {
    background: #ccc;
    cursor: not-allowed;
}

/* Real-time validation feedback */
input:valid {
    border-color: #28a745;
}

input:invalid:not(:placeholder-shown) {
    border-color: #dc3545;
}
Accessibility Features
Labels properly associated with inputs using for attribute

Required field indicator

Clear error messages

Keyboard navigable

Focus states visible