# Registration Form - Day 10 Project

## Project Overview
A complete registration form demonstrating HTML5 form elements and CSS validation styling.

## Skills Practiced
- `<form>` attributes (action, method)
- Input types: text, email, password, date
- `<select>` dropdown
- `<fieldset>` and `<legend>`
- Required attributes
- `:valid` and `:invalid` pseudo-classes
- Form validation styling

## File Structure
day-10-registration-form/
├── index.html
├── style.css
└── README.md

text

## Form Fields

| Field | Type | Validation |
|-------|------|------------|
| Full Name | text | Required, minlength=3 |
| Email | email | Required, email format |
| Password | password | Required, minlength=6 |
| Date of Birth | date | Required |
| Role | select | Required |
| Newsletter | checkbox | Optional |
| Terms | checkbox | Required |

## Validation Features
- Required field indicator (*)
- Green border for valid inputs
- Red border for invalid inputs
- Error messages appear only when input is invalid
- Terms checkbox validation styling
