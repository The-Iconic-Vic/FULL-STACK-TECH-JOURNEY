# 📘 CSS Transforms Reference

## What Are Transforms?

Transforms modify the appearance and position of elements without affecting document flow. Other elements are not affected by transforms.

---

## Transform Functions

### translate() - Move Element

Moves an element from its original position.

```css
/* Single value (X-axis only) */
transform: translate(50px);      /* Move right 50px */
transform: translate(-50px);     /* Move left 50px */

/* Two values (X, Y) */
transform: translate(50px, 20px);   /* Right 50px, down 20px */
transform: translate(-50%, -50%);   /* Center element */

/* 3D translate */
transform: translate3d(10px, 20px, 30px);
transform: translateX(50px);    /* X-axis only */
transform: translateY(30px);    /* Y-axis only */
transform: translateZ(20px);    /* Z-axis only */
rotate() - Rotate Element
Rotates an element clockwise or counterclockwise.

css
/* Degrees */
transform: rotate(45deg);    /* 45 degrees clockwise */
transform: rotate(-90deg);   /* 90 degrees counterclockwise */

/* Turns */
transform: rotate(0.25turn); /* 90 degrees */
transform: rotate(0.5turn);  /* 180 degrees */

/* Radians */
transform: rotate(3.1416rad); /* 180 degrees */

/* 3D rotation */
transform: rotateX(45deg);   /* Rotate around X-axis */
transform: rotateY(45deg);   /* Rotate around Y-axis */
transform: rotateZ(45deg);   /* Rotate around Z-axis */
scale() - Change Size
Changes the size of an element.

css
/* Uniform scaling */
transform: scale(1.2);   /* 120% of original size */
transform: scale(0.8);   /* 80% of original size */
transform: scale(2);     /* 200% (double size) */

/* Different X and Y */
transform: scale(1.5, 0.8);  /* Width 150%, height 80% */

/* Individual axes */
transform: scaleX(1.5);   /* Scale X only */
transform: scaleY(0.8);   /* Scale Y only */

/* 3D scale */
transform: scale3d(1.2, 1.2, 1.2);
skew() - Skew Element
Skews an element along axes.

css
/* Single value (X-axis) */
transform: skew(20deg);      /* Skew X only */

/* Two values (X, Y) */
transform: skew(20deg, 10deg);

/* Individual axes */
transform: skewX(20deg);     /* Skew X only */
transform: skewY(15deg);     /* Skew Y only */
Combining Transforms
Multiple transforms can be combined in one declaration.

css
/* Order matters - applied left to right */
.element {
    transform: translate(50px, 20px) rotate(45deg) scale(1.2);
}

/* Different order = different result */
.element {
    transform: rotate(45deg) translate(50px, 20px) scale(1.2);
}
transform-origin
Changes the point around which transforms occur.

css
/* Keywords */
transform-origin: center;        /* Default */
transform-origin: top left;
transform-origin: bottom right;
transform-origin: left;
transform-origin: right;
transform-origin: top;
transform-origin: bottom;

/* Percentage */
transform-origin: 25% 75%;

/* Pixel values */
transform-origin: 50px 100px;

/* Three values (3D) */
transform-origin: 50% 50% 0;
transform-style
Controls how children are rendered in 3D space.

css
.transform-container {
    transform-style: flat;     /* Default - flattens children */
    transform-style: preserve-3d; /* Preserves 3D positioning */
}
perspective
Adds depth to 3D transforms.

css
.container {
    perspective: 1000px;   /* Depth of 3D space */
}

.element {
    transform: rotateX(45deg);
}
Common Transform Patterns
Center an Element
css
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
Hover Scale
css
.card:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
Hover Lift
css
.button:hover {
    transform: translateY(-3px);
    transition: transform 0.2s ease;
}
3D Flip Card
css
.flip-card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flip-card:hover {
    transform: rotateY(180deg);
}
Rotation on Hover
css
.icon:hover {
    transform: rotate(360deg);
    transition: transform 0.5s ease;
}
Performance Notes
Property	Performance
transform	✅ GPU accelerated
translate	✅ GPU accelerated
rotate	✅ GPU accelerated
scale	✅ GPU accelerated
skew	✅ GPU accelerated
Always prefer transforms over positioning properties for animations.

css
/* GOOD - uses GPU */
.element {
    transform: translateX(50px);
    transition: transform 0.3s;
}

/* AVOID - causes layout reflow */
.element {
    left: 50px;
    transition: left 0.3s;
}
Browser Support
Property	Support
2D Transforms	All modern browsers
3D Transforms	All modern browsers
transform-origin	All modern browsers
transform-style	All modern browsers
perspective	All modern browsers