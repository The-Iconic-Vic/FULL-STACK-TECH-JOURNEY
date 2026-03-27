# 📘 Links Reference Guide

## Anchor Tag Basics

```html
<a href="url">Link Text</a>
href Attributes
Type	Example
Absolute URL	<a href="https://example.com">
Relative URL	<a href="about.html">
Email	<a href="mailto:email@example.com">
Phone	<a href="tel:+1234567890">
Download	<a href="file.pdf" download>
target Attribute
Value	Behavior
_blank	New tab/window
_self	Same tab (default)
_parent	Parent frame
_top	Full window
Security
html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
Fragment Identifiers
html
<!-- Target -->
<h2 id="section-name">Heading</h2>

<!-- Link -->
<a href="#section-name">Jump to Section</a>
<a href="page.html#section-name">Jump on Another Page</a>

<!-- Back to top -->
<a href="#top">Back to Top</a>
Link States (CSS)
State	Description
:link	Unvisited link
:visited	Visited link
:hover	Mouse over
:active	Being clicked