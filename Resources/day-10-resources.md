# 📚 Day 10 Resources - Forms & Input Validation

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: HTML Forms | https://developer.mozilla.org/en-US/docs/Learn/Forms |
| MDN: Form Elements | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form |
| MDN: Input Types | https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input |
| MDN: Form Validation | https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation |
| MDN: Constraint Validation | https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation |
| MDN: ARIA Forms | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms |
| W3Schools: HTML Forms | https://www.w3schools.com/html/html_forms.asp |
| W3Schools: Form Validation | https://www.w3schools.com/html/html_form_attributes.asp |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| HTML Forms Tutorial | https://youtu.be/fNcJuPIZ2WE |
| HTML5 Form Validation | https://youtu.be/4S_sP4bCxR4 |
| CSS Form Styling | https://youtu.be/PlVYGiOqqAE |
| Accessible Forms | https://youtu.be/Ff3xIXn9BOA |
| Input Types Explained | https://youtu.be/wExd9-UNp8E |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Regexr | Test regular expressions | https://regexr.com |
| Regex101 | Regex testing and explanation | https://regex101.com |
| HTML Form Generator | Generate form HTML | https://html-form.com |
| W3C Validator | Validate HTML | https://validator.w3.org |
| Wave | Accessibility testing | https://wave.webaim.org |

## 📝 Input Types Cheatsheet

| Type | Use Case | Browser Support |
|------|----------|-----------------|
| `text` | General text | All |
| `email` | Email addresses | All |
| `tel` | Phone numbers | All |
| `url` | Website URLs | All |
| `password` | Password input | All |
| `number` | Numeric values | All |
| `range` | Slider control | All |
| `date` | Date picker | All modern |
| `datetime-local` | Date + time | All modern |
| `month` | Month picker | All modern |
| `week` | Week picker | All modern |
| `time` | Time picker | All modern |
| `color` | Color picker | All |
| `checkbox` | Multiple selection | All |
| `radio` | Single selection | All |
| `file` | File upload | All |
| `search` | Search field | All |

## 📝 Validation Attributes Cheatsheet

| Attribute | Example | Purpose |
|-----------|---------|---------|
| `required` | `required` | Field must be filled |
| `minlength` | `minlength="3"` | Minimum characters |
| `maxlength` | `maxlength="20"` | Maximum characters |
| `min` | `min="18"` | Minimum numeric value |
| `max` | `max="99"` | Maximum numeric value |
| `step` | `step="5"` | Valid increment step |
| `pattern` | `pattern="[A-Z]+"` | Regex pattern match |

## 📝 Pattern Examples Cheatsheet

| Use Case | Pattern |
|----------|---------|
| Letters only | `[A-Za-z]+` |
| Numbers only | `[0-9]+` |
| Alphanumeric | `[A-Za-z0-9]+` |
| US Phone (123-456-7890) | `[0-9]{3}-[0-9]{3}-[0-9]{4}` |
| US Phone (1234567890) | `[0-9]{10}` |
| Email (basic) | `[^@]+@[^@]+\.[^@]+` |
| Username (3-16 chars) | `[A-Za-z0-9_]{3,16}` |
| ZIP Code (US) | `[0-9]{5}` |
| Time (HH:MM) | `([01][0-9]|2[0-3]):[0-5][0-9]` |

## 📝 CSS Validation Pseudo-classes

| Pseudo-class | Description |
|--------------|-------------|
| `:valid` | Input value is valid |
| `:invalid` | Input value is invalid |
| `:required` | Field has required attribute |
| `:optional` | Field does not have required |
| `:in-range` | Value within min/max |
| `:out-of-range` | Value outside min/max |
| `:read-only` | Field is read-only |
| `:read-write` | Field is editable |

## ✅ Common Form Patterns

### Registration Form
```html
<form>
    <input type="text" name="fullname" required>
    <input type="email" name="email" required>
    <input type="password" name="password" minlength="6" required>
    <input type="date" name="dob" required>
    <select name="country" required>
        <option value="">Select</option>
    </select>
    <button type="submit">Register</button>
</form>
Contact Form
html
<form>
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <input type="text" name="subject" required>
    <textarea name="message" required></textarea>
    <button type="submit">Send</button>
</form>
Login Form
html
<form>
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button type="submit">Login</button>
</form>
Search Form
html
<form>
    <input type="search" name="q" placeholder="Search...">
    <button type="submit">Search</button>
</form>
♿ Accessibility Resources
Resource	Link
WebAIM: Creating Accessible Forms	https://webaim.org/techniques/forms/
A11Y Project: Forms	https://www.a11yproject.com/
W3C: Forms Accessibility	https://www.w3.org/WAI/tutorials/forms/
🐛 Common Issues & Solutions
Issue	Cause	Solution
Validation styling not working	:invalid matches empty fields	Use :invalid:not(:placeholder-shown)
Form submits with invalid data	No validation attributes	Add required, pattern, etc.
Screen reader doesn't announce label	Missing for attribute	Use <label for="id">
Custom error message not showing	No title attribute	Add title="message"
Number input allows letters	Browser behavior	Validation prevents submission
Date picker not showing	Old browser	Use type="text" with pattern
📚 Further Reading
Topic	Link
HTML5 Forms (Smashing Magazine)	https://www.smashingmagazine.com/2021/08/html5-forms/
Modern Form Validation	https://css-tricks.com/form-validation-ux-html-css/
Styling Form Validation	https://developer.mozilla.org/en-US/docs/Learn/Forms/UI_pseudo-classes
Constraint Validation API	https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation