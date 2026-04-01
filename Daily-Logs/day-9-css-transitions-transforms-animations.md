
# 📅 Day 9: CSS Transitions, Transforms & Animations

**Date:** March 31, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** CSS Transitions, CSS Transforms, Keyframe Animations

---

## 📋 Learning Objectives

- ✅ Create smooth transitions for hover effects and state changes
- ✅ Understand which CSS properties can be transitioned
- ✅ Apply transforms: `translate()`, `rotate()`, `scale()`, `skew()`
- ✅ Combine multiple transforms on a single element
- ✅ Create complex animations with `@keyframes`
- ✅ Control animations with properties like duration, iteration-count, and direction

---

## 🎯 Part 1: CSS Transitions

### What are CSS Transitions?

Transitions allow CSS properties to change smoothly over a specified duration. Instead of changing instantly, values interpolate gradually, creating polished, professional interactions.

**Without transition:** Property changes instantly  
**With transition:** Property changes smoothly over time

---

### Transition Properties

| Property | Description | Example |
|----------|-------------|---------|
| `transition-property` | Which properties to animate | `transition-property: background, transform;` |
| `transition-duration` | How long the transition takes | `transition-duration: 0.3s;` |
| `transition-timing-function` | Speed curve of transition | `transition-timing-function: ease;` |
| `transition-delay` | Delay before transition starts | `transition-delay: 0.1s;` |

---

### `transition-property`

Specifies which CSS properties should transition.

```css
/* Single property */
.button {
    transition-property: background;
}

/* Multiple properties (comma-separated) */
.button {
    transition-property: background, transform, box-shadow;
}

/* All changing properties */
.button {
    transition-property: all;
}
```

---

### `transition-duration`

How long the transition takes. Values can be in seconds (`s`) or milliseconds (`ms`).

```css
.button {
    transition-duration: 0.3s;   /* 300 milliseconds */
    transition-duration: 300ms;  /* same as above */
}
```

---

### `transition-timing-function`

Defines the speed curve of the transition.

| Value | Description |
|-------|-------------|
| `ease` | Starts slow, speeds up, ends slow (default) |
| `linear` | Constant speed |
| `ease-in` | Starts slow, ends fast |
| `ease-out` | Starts fast, ends slow |
| `ease-in-out` | Starts slow, fast middle, ends slow |
| `cubic-bezier(n,n,n,n)` | Custom curve |

```css
.button {
    transition-timing-function: ease;
    transition-timing-function: linear;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

### `transition-delay`

Waits before starting the transition.

```css
.button {
    transition-delay: 0.2s;  /* Starts after 0.2 seconds */
}
```

---

### `transition` Shorthand

Combines all four properties in one declaration.

```css
/* order: property duration timing-function delay */
.button {
    transition: background 0.3s ease;
    transition: all 0.3s ease-in-out 0.1s;
}

/* Multiple transitions */
.button {
    transition: background 0.3s ease, transform 0.2s linear;
}
```

---

### What Properties Can Be Transitioned?

Only properties with **interpolable values** can transition.

**Common Transitionable Properties:**

| Category | Properties |
|----------|------------|
| Colors | `color`, `background-color`, `border-color`, `outline-color` |
| Sizing | `width`, `height`, `padding`, `margin` |
| Positioning | `top`, `right`, `bottom`, `left` |
| Typography | `font-size`, `letter-spacing`, `line-height` |
| Visual | `opacity`, `box-shadow`, `border-radius`, `z-index` |
| Transforms | `transform` |

```css
/* All of these can transition */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    background-color: #f0f0f0;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border-radius: 20px;
    opacity: 0.9;
}
```

---

## 🎨 Part 2: CSS Transforms

Transforms allow you to modify the appearance and position of elements without affecting document flow.

### Transform Functions

| Function | Description | Example |
|----------|-------------|---------|
| `translate()` | Moves element | `transform: translate(50px, 20px);` |
| `rotate()` | Rotates element | `transform: rotate(45deg);` |
| `scale()` | Changes size | `transform: scale(1.2);` |
| `skew()` | Skews element | `transform: skew(10deg, 5deg);` |

---

### `translate()`

Moves an element from its original position.

```css
/* Single value (X-axis only) */
transform: translate(50px);

/* Two values (X, Y) */
transform: translate(50px, 20px);

/* Percentage (relative to element size) */
transform: translate(-50%, -50%); /* Centers element */
```

---

### `rotate()`

Rotates an element clockwise or counterclockwise.

```css
/* Positive = clockwise */
transform: rotate(45deg);
transform: rotate(180deg);

/* Negative = counterclockwise */
transform: rotate(-90deg);

/* Turns */
transform: rotate(0.25turn);  /* 90 degrees */
transform: rotate(0.5turn);   /* 180 degrees */
```

---

### `scale()`

Changes the size of an element.

```css
/* Uniform scaling (both axes) */
transform: scale(1.2);  /* 120% of original size */
transform: scale(0.8);  /* 80% of original size */

/* Different X and Y */
transform: scale(1.5, 0.8);

/* Scale X only */
transform: scaleX(1.5);

/* Scale Y only */
transform: scaleY(0.8);
```

---

### `skew()`

Skews an element along the X and Y axes.

```css
/* Skew X only */
transform: skewX(20deg);

/* Skew Y only */
transform: skewY(10deg);

/* Both axes */
transform: skew(20deg, 5deg);
```

---

### Combining Transforms

Multiple transforms can be combined in one declaration.

```css
/* Order matters! Applied left to right */
.element {
    transform: translate(50px, 20px) rotate(45deg) scale(1.2);
}

/* Different order = different result */
.element {
    transform: rotate(45deg) translate(50px, 20px);
}
```

---

### `transform-origin`

Changes the point around which transforms occur.

```css
/* Keywords */
transform-origin: center;        /* Default */
transform-origin: top left;
transform-origin: bottom right;

/* Percentage */
transform-origin: 25% 75%;

/* Pixel values */
transform-origin: 50px 100px;
```

---

## 🎬 Part 3: Keyframe Animations

While transitions animate between two states, keyframe animations allow complex, multi-step animations with full control.

---

### `@keyframes` Rule

Defines the animation sequence.

```css
@keyframes animation-name {
    0% {
        /* styles at start */
    }
    50% {
        /* styles at middle */
    }
    100% {
        /* styles at end */
    }
}
```

**Example:**
```css
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-30px);
    }
    100% {
        transform: translateY(0);
    }
}
```

---

### Animation Properties

| Property | Description | Example |
|----------|-------------|---------|
| `animation-name` | Name of keyframes | `animation-name: bounce;` |
| `animation-duration` | Length of animation | `animation-duration: 1s;` |
| `animation-timing-function` | Speed curve | `animation-timing-function: ease;` |
| `animation-delay` | Delay before start | `animation-delay: 0.5s;` |
| `animation-iteration-count` | Number of repeats | `animation-iteration-count: infinite;` |
| `animation-direction` | Play direction | `animation-direction: alternate;` |
| `animation-fill-mode` | Styles before/after | `animation-fill-mode: forwards;` |
| `animation-play-state` | Pause/resume | `animation-play-state: paused;` |

---

### `animation-iteration-count`

```css
/* Play once */
animation-iteration-count: 1;

/* Play 3 times */
animation-iteration-count: 3;

/* Loop forever */
animation-iteration-count: infinite;
```

---

### `animation-direction`

| Value | Description |
|-------|-------------|
| `normal` | Plays forward (default) |
| `reverse` | Plays backward |
| `alternate` | Forward, then reverse |
| `alternate-reverse` | Reverse, then forward |

---

### `animation-fill-mode`

Controls what styles apply before and after animation.

| Value | Description |
|-------|-------------|
| `none` | No styles outside animation (default) |
| `forwards` | Retains end state after animation |
| `backwards` | Applies start state before delay |
| `both` | Both forwards and backwards |

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.element {
    animation: fadeIn 1s forwards;
    /* Stays visible after animation ends */
}
```

---

### `animation` Shorthand

```css
/* order: name duration timing-function delay iteration-count direction fill-mode */
.element {
    animation: bounce 1s ease 0s infinite alternate;
    animation: fadeIn 0.5s forwards;
    animation: spin 2s linear infinite;
}
```

---

## 📝 Quick Reference

### Transition Properties

| Property | Values |
|----------|--------|
| `transition-property` | `all`, property names |
| `transition-duration` | time (s, ms) |
| `transition-timing-function` | `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out` |
| `transition-delay` | time |

### Transform Functions

| Function | Effect |
|----------|--------|
| `translate(x, y)` | Moves element |
| `rotate(angle)` | Rotates element |
| `scale(x, y)` | Changes size |
| `skew(x, y)` | Skews element |

### Animation Properties

| Property | Values |
|----------|--------|
| `animation-name` | keyframe name |
| `animation-duration` | time |
| `animation-iteration-count` | number, `infinite` |
| `animation-direction` | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | `none`, `forwards`, `backwards`, `both` |
| `animation-timing-function` | `ease`, `linear`, etc. |

---

## ✅ Day 9 Checklist

- [ ] Understand CSS transitions and their properties
- [ ] Use `transition` shorthand
- [ ] Apply transforms: `translate()`, `rotate()`, `scale()`, `skew()`
- [ ] Combine multiple transforms
- [ ] Use `transform-origin` to change transform point
- [ ] Create `@keyframes` animations
- [ ] Control animation with `iteration-count`, `direction`, `fill-mode`
- [ ] Build Interactive Button mini-project
- [ ] Build Animated Components mini-project (bell, pulse, spinner, bounce)
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **Transitions** animate between states (hover, focus)
2. **Transforms** change element appearance without affecting layout
3. **Transitions require a trigger** (like :hover) to start
4. **Animations run automatically** when page loads
5. **Multiple transforms** can be combined in one property
6. **`transform-origin`** changes the pivot point for transforms
7. **Keyframes** define complex, multi-step animations
8. **`infinite`** makes animations loop forever
9. **`forwards`** keeps the end state after animation completes
