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
