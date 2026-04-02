# 📘 Form Accessibility Reference

## Why Form Accessibility Matters

- **Screen readers** need proper labels to announce inputs
- **Keyboard users** need logical focus order
- **Users with motor impairments** need larger click targets
- **Users with cognitive disabilities** need clear error messages

---

## The `<label>` Element

### Method 1: `for` attribute (Recommended)

```html
<label for="username">Username</label>
<input type="text" id="username" name="username">
Method 2: Wrapping the input
html
<label>
    Username
    <input type="text" name="username">
</label>
Label Best Practices
Practice	Why
Every input needs a label	Screen readers announce labels
Use for attribute	Best compatibility
Keep labels close to inputs	Visual association
Use clear, descriptive text	Users understand what's required
Mark required fields with *	Visual indicator
Required Field Indicators
html
<!-- Visual asterisk -->
<label for="email">Email Address <span class="required">*</span></label>
<input type="email" id="email" required>

<!-- CSS method -->
<style>
    label.required::after {
        content: " *";
        color: #dc3545;
    }
</style>

<label class="required" for="email">Email Address</label>
<input type="email" id="email" required>
ARIA Attributes for Forms
Attribute	Description	Example
aria-label	Provides a label when no visible label	<input aria-label="Search">
aria-labelledby	Points to element providing label	<input aria-labelledby="name-label">
aria-describedby	Points to element with description	<input aria-describedby="name-hint">
aria-required	Indicates required field	<input aria-required="true">
aria-invalid	Indicates invalid input	<input aria-invalid="true">
aria-errormessage	Points to error message	<input aria-errormessage="name-error">
html
<!-- aria-describedby example -->
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="password-hint">
<span id="password-hint">Password must be at least 8 characters</span>

<!-- aria-errormessage example -->
<label for="email">Email</label>
<input type="email" id="email" aria-invalid="true" aria-errormessage="email-error">
<span id="email-error">Please enter a valid email address</span>
Focus Management
Visible Focus Indicators
css
/* Always have visible focus for keyboard users */
input:focus, button:focus, select:focus, textarea:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

/* Better approach - only show when using keyboard */
input:focus-visible, button:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

/* Remove default outline only when not needed */
input:focus:not(:focus-visible) {
    outline: none;
}
Logical Tab Order
html
<!-- Tab order follows DOM order naturally -->

<!-- Skip navigation link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Use tabindex for custom order (use sparingly) -->
<input type="text" name="field1" tabindex="1">
<input type="text" name="field2" tabindex="2">
tabindex values:

Value	Behavior
0	Reachable in natural order
-1	Only reachable programmatically
1+	Custom order (avoid - causes issues)
Grouping Related Fields
html
<fieldset>
    <legend>Contact Information</legend>
    
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
</fieldset>

<fieldset>
    <legend>Preferred Contact Method</legend>
    
    <input type="radio" id="email-contact" name="contact" value="email">
    <label for="email-contact">Email</label>
    
    <input type="radio" id="phone-contact" name="contact" value="phone">
    <label for="phone-contact">Phone</label>
</fieldset>
Error Messages
Accessible Error Messages
html
<div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" required aria-describedby="email-error">
    <div id="email-error" class="error-message" role="alert">
        Please enter a valid email address
    </div>
</div>
Best Practices:

Use aria-describedby to associate error with input

Use role="alert" for dynamic errors

Place error messages near the input

Use clear, specific language

Don't rely on color alone to indicate errors

Form Structure Best Practices
html
<!-- Complete accessible form example -->
<form method="post" action="/submit">
    <!-- Use fieldsets for logical grouping -->
    <fieldset>
        <legend>Personal Information</legend>
        
        <div class="form-group">
            <label for="name">Full Name <span class="required">*</span></label>
            <input type="text" id="name" name="name" required 
                   aria-describedby="name-error name-hint">
            <span id="name-hint" class="hint">Enter your full legal name</span>
            <span id="name-error" class="error" role="alert"></span>
        </div>
        
        <div class="form-group">
            <label for="email">Email Address <span class="required">*</span></label>
            <input type="email" id="email" name="email" required
                   aria-describedby="email-error">
            <span id="email-error" class="error" role="alert"></span>
        </div>
    </fieldset>
    
    <!-- Submit button -->
    <button type="submit">Submit</button>
</form>
Accessibility Checklist
Every input has an associated <label>

Required fields are visually marked (asterisk)

Required fields use required attribute

Error messages are associated with inputs using aria-describedby

Error messages have role="alert" for dynamic errors

Focus indicators are visible for keyboard navigation

Form fields are grouped with <fieldset> and <legend>

Color is not the only way to indicate validation state

Inputs have appropriate autocomplete attributes

Page has a skip navigation link

Tab order follows logical sequence

text

---

## Autocomplete Attributes

Helps browsers fill in forms automatically.

```html
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="address" autocomplete="street-address">
<input type="text" name="city" autocomplete="address-level2">
<input type="text" name="country" autocomplete="country">
Value	Description
name	Full name
given-name	First name
family-name	Last name
email	Email address
tel	Phone number
street-address	Street address
postal-code	ZIP/Postal code
country	Country
username	Username
current-password	Current password
new-password	New password