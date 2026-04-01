# 📚 Day 9 Resources - CSS Transitions, Transforms & Animations

## 🎮 Interactive Games

| Game | Description | Link |
|------|-------------|------|
| CSS Diner | Practice CSS selectors | https://flukeout.github.io |
| CSS Animation | Interactive animation playground | https://cssanimation.rocks |

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Using CSS Transitions | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions |
| MDN: Transform | https://developer.mozilla.org/en-US/docs/Web/CSS/transform |
| MDN: Using CSS Animations | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations |
| MDN: @keyframes | https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes |
| W3Schools: CSS Transitions | https://www.w3schools.com/css/css3_transitions.asp |
| W3Schools: CSS Transforms | https://www.w3schools.com/css/css3_2dtransforms.asp |
| W3Schools: CSS Animations | https://www.w3schools.com/css/css3_animations.asp |
| CSS-Tricks: Transitions | https://css-tricks.com/almanac/properties/t/transition/ |
| CSS-Tricks: Transforms | https://css-tricks.com/almanac/properties/t/transform/ |
| CSS-Tricks: Animations | https://css-tricks.com/almanac/properties/a/animation/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| CSS Transitions in 20 Minutes | https://youtu.be/8kK-cA99SA0 |
| CSS Transforms Tutorial | https://youtu.be/3ZJs3MW18MY |
| CSS Animations Tutorial | https://youtu.be/YszONjKpgg4 |
| Advanced CSS Animations | https://youtu.be/zHUpx90NerM |
| 10 CSS Animation Examples | https://youtu.be/3ZJs3MW18MY |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Cubic Bezier Generator | Create custom timing functions | https://cubic-bezier.com |
| Easing Functions Cheatsheet | Visual easing curves | https://easings.net |
| Keyframe Animations Generator | Generate CSS animations | https://keyframes.app |
| Animista | Ready-to-use CSS animations | https://animista.net |
| CSS Transforms Generator | Visual transform builder | https://css-transform-generator.netlify.app |
| Animate.css | Pre-built animation library | https://animate.style |
| Hover.css | Pre-built hover effects | https://ianlunn.github.io/Hover/ |

## 📝 Transition Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `transition-property` | `all`, property names | `all` |
| `transition-duration` | time (s, ms) | `0s` |
| `transition-timing-function` | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()` | `ease` |
| `transition-delay` | time | `0s` |

## 📝 Transform Functions Cheatsheet

| Function | Description | Example |
|----------|-------------|---------|
| `translate(x, y)` | Move element | `translate(50px, 20px)` |
| `translateX(x)` | Move horizontally | `translateX(50px)` |
| `translateY(y)` | Move vertically | `translateY(20px)` |
| `rotate(angle)` | Rotate | `rotate(45deg)` |
| `scale(x, y)` | Resize | `scale(1.2)` |
| `scaleX(x)` | Resize horizontally | `scaleX(1.5)` |
| `scaleY(y)` | Resize vertically | `scaleY(0.8)` |
| `skew(x, y)` | Skew | `skew(10deg, 5deg)` |

## 📝 Animation Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `animation-name` | keyframe name | `none` |
| `animation-duration` | time | `0s` |
| `animation-timing-function` | `ease`, `linear`, etc. | `ease` |
| `animation-delay` | time | `0s` |
| `animation-iteration-count` | number, `infinite` | `1` |
| `animation-direction` | `normal`, `reverse`, `alternate`, `alternate-reverse` | `normal` |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` | `none` |
| `animation-play-state` | `running`, `paused` | `running` |

## ✅ Common Timing Functions

| Function | Curve | Best For |
|----------|-------|----------|
| `ease` | Slow-fast-slow | Most hover effects |
| `linear` | Constant | Spinners, progress bars |
| `ease-in` | Slow to fast | Fade in, slide in |
| `ease-out` | Fast to slow | Fade out, slide out |
| `ease-in-out` | Slow-fast-slow | Smooth transitions |
| `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bounce | Fun, playful effects |

## 🎨 Animation Examples Library

### Fade Effects
```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
Slide Effects
css
@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
Attention Effects
css
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
@keyframes wobble { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 75% { transform: rotate(-5deg); } }
Loading Effects
css
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes dots { 0% { content: "."; } 33% { content: ".."; } 66% { content: "..."; } }
@keyframes shimmer { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }
🐛 Common Issues & Solutions
Issue	Cause	Solution
Transition not working	Property not transitionable	Use transitionable property (opacity, transform, color, etc.)
Animation not starting	Missing animation-name	Check keyframe name matches
Animation jumps at end	No fill-mode	Add animation-fill-mode: forwards
Transform order issues	Wrong transform order	Order matters - translate then rotate vs rotate then translate
Performance issues	Animating layout properties	Use transform and opacity instead of width/height/top/left
3D transform not working	Missing perspective	Add perspective to parent or use transform: translateZ()
📚 Further Reading
Topic	Link
CSS Animation Performance	https://web.dev/animations-guide/
High Performance Animations	https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
CSS Triggers	https://csstriggers.com
The Animation at Work	https://www.smashingmagazine.com/2021/01/css-animation-work/
🔗 Related Resources
Day 4 Resources - CSS Basics

Day 5 Resources - Box Model

Day 6 Resources - Flexbox

Day 7 Resources - CSS Grid

Day 8 Resources - Advanced Selectors

text
# 📘 CSS Animations Reference

## What Are CSS Animations?

CSS animations allow elements to transition between multiple states using keyframes. Unlike transitions (which require a trigger), animations run automatically.

---

## @keyframes Rule

Defines the animation sequence.

```css
@keyframes animation-name {
    from {
        /* start styles */
    }
    to {
        /* end styles */
    }
}

/* With percentages */
@keyframes slideIn {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    50% {
        transform: translateX(10%);
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
Animation Properties
animation-name
Specifies which keyframes to use.

css
.element {
    animation-name: slideIn;
}
animation-duration
How long the animation takes.

css
.element {
    animation-duration: 1s;    /* 1 second */
    animation-duration: 500ms; /* 500 milliseconds */
}
animation-timing-function
Defines the speed curve.

css
.element {
    animation-timing-function: ease;
    animation-timing-function: linear;
    animation-timing-function: ease-in-out;
    animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
animation-delay
Delay before animation starts.

css
.element {
    animation-delay: 0s;      /* No delay */
    animation-delay: 0.5s;    /* 500ms delay */
}
animation-iteration-count
Number of times animation repeats.

css
.element {
    animation-iteration-count: 1;       /* Once (default) */
    animation-iteration-count: 3;       /* Three times */
    animation-iteration-count: infinite; /* Forever */
}
animation-direction
Direction of the animation.

Value	Description
normal	Plays forward (default)
reverse	Plays backward
alternate	Forward, then reverse
alternate-reverse	Reverse, then forward
css
.element {
    animation-direction: alternate;
}
animation-fill-mode
Styles applied before and after animation.

Value	Description
none	No styles outside animation (default)
forwards	Retains end state after animation
backwards	Applies start state before delay
both	Both forwards and backwards
css
.element {
    animation: fadeIn 1s forwards; /* Stays visible after */
}
animation-play-state
Pause or resume animation.

css
.element {
    animation-play-state: running;  /* Default */
    animation-play-state: paused;   /* Paused */
}

.element:hover {
    animation-play-state: paused;
}
animation Shorthand
css
/* order: name duration timing-function delay iteration-count direction fill-mode */
.element {
    animation: bounce 1s ease 0s infinite alternate;
    animation: fadeIn 0.5s forwards;
    animation: spin 2s linear infinite;
}
Common Animation Examples
Fade In
css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.element {
    animation: fadeIn 1s ease forwards;
}
Slide In
css
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.element {
    animation: slideIn 0.5s ease-out forwards;
}
Bounce
css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-30px);
    }
}

.element {
    animation: bounce 1s ease-in-out infinite;
}
Pulse
css
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
    }
    70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
    }
}

.button {
    animation: pulse 2s infinite;
}
Spin
css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    animation: spin 1s linear infinite;
}
Shake
css
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-10px);
    }
    75% {
        transform: translateX(10px);
    }
}

.element:hover {
    animation: shake 0.3s ease-in-out;
}
Wobble
css
@keyframes wobble {
    0%, 100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(5deg);
    }
    75% {
        transform: rotate(-5deg);
    }
}
Animation Events (JavaScript)
javascript
// Detect animation start
element.addEventListener('animationstart', () => {
    console.log('Animation started');
});

// Detect animation end
element.addEventListener('animationend', () => {
    console.log('Animation finished');
});

// Detect animation iteration
element.addEventListener('animationiteration', () => {
    console.log('Animation repeated');
});
Performance Tips
Use transform and opacity for smooth animations

Add will-change for animations that run frequently

Keep animations short (0.3s - 1s for UI animations)

Use infinite sparingly - can be distracting

css
.animated-element {
    will-change: transform, opacity;
    animation: slideIn 0.5s ease forwards;
}
Browser Support
Property	Support
@keyframes	All modern browsers
animation	All modern browsers
animation-* properties	All modern browsers
text
can i have what is in the resource folder
File: resources/day-9-resources.md

markdown
# 📚 Day 9 Resources - CSS Transitions, Transforms & Animations

## 🎮 Interactive Games

| Game | Description | Link |
|------|-------------|------|
| CSS Diner | Practice CSS selectors | https://flukeout.github.io |
| CSS Animation | Interactive animation playground | https://cssanimation.rocks |

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| MDN: Using CSS Transitions | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions |
| MDN: Transform | https://developer.mozilla.org/en-US/docs/Web/CSS/transform |
| MDN: Using CSS Animations | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations |
| MDN: @keyframes | https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes |
| W3Schools: CSS Transitions | https://www.w3schools.com/css/css3_transitions.asp |
| W3Schools: CSS Transforms | https://www.w3schools.com/css/css3_2dtransforms.asp |
| W3Schools: CSS Animations | https://www.w3schools.com/css/css3_animations.asp |
| CSS-Tricks: Transitions | https://css-tricks.com/almanac/properties/t/transition/ |
| CSS-Tricks: Transforms | https://css-tricks.com/almanac/properties/t/transform/ |
| CSS-Tricks: Animations | https://css-tricks.com/almanac/properties/a/animation/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| CSS Transitions in 20 Minutes | https://youtu.be/8kK-cA99SA0 |
| CSS Transforms Tutorial | https://youtu.be/3ZJs3MW18MY |
| CSS Animations Tutorial | https://youtu.be/YszONjKpgg4 |
| Advanced CSS Animations | https://youtu.be/zHUpx90NerM |
| 10 CSS Animation Examples | https://youtu.be/3ZJs3MW18MY |

## 🛠️ Tools

| Tool | Purpose | Link |
|------|---------|------|
| Cubic Bezier Generator | Create custom timing functions | https://cubic-bezier.com |
| Easing Functions Cheatsheet | Visual easing curves | https://easings.net |
| Keyframe Animations Generator | Generate CSS animations | https://keyframes.app |
| Animista | Ready-to-use CSS animations | https://animista.net |
| CSS Transforms Generator | Visual transform builder | https://css-transform-generator.netlify.app |
| Animate.css | Pre-built animation library | https://animate.style |
| Hover.css | Pre-built hover effects | https://ianlunn.github.io/Hover/ |

## 📝 Transition Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `transition-property` | `all`, property names | `all` |
| `transition-duration` | time (s, ms) | `0s` |
| `transition-timing-function` | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()` | `ease` |
| `transition-delay` | time | `0s` |

## 📝 Transform Functions Cheatsheet

| Function | Description | Example |
|----------|-------------|---------|
| `translate(x, y)` | Move element | `translate(50px, 20px)` |
| `translateX(x)` | Move horizontally | `translateX(50px)` |
| `translateY(y)` | Move vertically | `translateY(20px)` |
| `rotate(angle)` | Rotate | `rotate(45deg)` |
| `scale(x, y)` | Resize | `scale(1.2)` |
| `scaleX(x)` | Resize horizontally | `scaleX(1.5)` |
| `scaleY(y)` | Resize vertically | `scaleY(0.8)` |
| `skew(x, y)` | Skew | `skew(10deg, 5deg)` |

## 📝 Animation Properties Cheatsheet

| Property | Values | Default |
|----------|--------|---------|
| `animation-name` | keyframe name | `none` |
| `animation-duration` | time | `0s` |
| `animation-timing-function` | `ease`, `linear`, etc. | `ease` |
| `animation-delay` | time | `0s` |
| `animation-iteration-count` | number, `infinite` | `1` |
| `animation-direction` | `normal`, `reverse`, `alternate`, `alternate-reverse` | `normal` |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` | `none` |
| `animation-play-state` | `running`, `paused` | `running` |

## ✅ Common Timing Functions

| Function | Curve | Best For |
|----------|-------|----------|
| `ease` | Slow-fast-slow | Most hover effects |
| `linear` | Constant | Spinners, progress bars |
| `ease-in` | Slow to fast | Fade in, slide in |
| `ease-out` | Fast to slow | Fade out, slide out |
| `ease-in-out` | Slow-fast-slow | Smooth transitions |
| `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bounce | Fun, playful effects |

## 🎨 Animation Examples Library

### Fade Effects
```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
Slide Effects
css
@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes slideInDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
Attention Effects
css
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
@keyframes wobble { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 75% { transform: rotate(-5deg); } }
Loading Effects
css
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes dots { 0% { content: "."; } 33% { content: ".."; } 66% { content: "..."; } }
@keyframes shimmer { 0% { background-position: -100% 0; } 100% { background-position: 200% 0; } }
🐛 Common Issues & Solutions
Issue	Cause	Solution
Transition not working	Property not transitionable	Use transitionable property (opacity, transform, color, etc.)
Animation not starting	Missing animation-name	Check keyframe name matches
Animation jumps at end	No fill-mode	Add animation-fill-mode: forwards
Transform order issues	Wrong transform order	Order matters - translate then rotate vs rotate then translate
Performance issues	Animating layout properties	Use transform and opacity instead of width/height/top/left
3D transform not working	Missing perspective	Add perspective to parent or use transform: translateZ()
📚 Further Reading
Topic	Link
CSS Animation Performance	https://web.dev/animations-guide/
High Performance Animations	https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
CSS Triggers	https://csstriggers.com
The Animation at Work	https://www.smashingmagazine.com/2021/01/css-animation-work/
