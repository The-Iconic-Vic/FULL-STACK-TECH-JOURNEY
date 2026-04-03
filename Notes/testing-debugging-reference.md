# 📘 Testing & Debugging Reference

## Chrome DevTools Device Emulation

### How to Access
1. Open DevTools (`F12` or right-click → Inspect)
2. Click Device Toggle icon (📱) or press `Ctrl+Shift+M`
3. Select device from dropdown menu

### Device Presets

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375px | 667px |
| iPhone 12/13 | 390px | 844px |
| iPhone 14 Pro Max | 430px | 932px |
| Pixel 5 | 393px | 851px |
| iPad | 768px | 1024px |
| iPad Pro | 1024px | 1366px |
| Desktop | 1440px+ | varies |

### Features
- **Responsive mode:** Drag corners to any size
- **Rotate:** Toggle between portrait/landscape
- **Throttling:** Simulate 3G/4G/slow networks
- **Touch simulation:** Emulate touch events
- **Device pixel ratio:** Test high DPI displays

---

## Testing Checklist

### Visual Testing
- [ ] Text is readable without zooming
- [ ] No horizontal scroll
- [ ] Images don't overflow containers
- [ ] Buttons are large enough to tap (44px min)
- [ ] Spacing is consistent
- [ ] Font sizes are appropriate

### Functional Testing
- [ ] All links work
- [ ] Forms are usable
- [ ] Dropdowns work correctly
- [ ] Hover effects don't break touch
- [ ] Navigation is accessible

### Device Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1440px+)
- [ ] Landscape orientation on all

---

## Common Issues & Solutions

### Horizontal Scroll

**Problem:** Page scrolls sideways

**Debug:**
```css
/* Find overflowing element */
* {
    outline: 1px solid red;
}
Solutions:

css
/* Check containers */
img {
    max-width: 100%;
    height: auto;
}

.container {
    overflow-x: hidden;
}

/* Find specific overflow */
body {
    overflow-x: hidden;
}
Font Too Small on Mobile
Problem: Text is unreadable

Solutions:

css
/* Use clamp() */
body {
    font-size: clamp(1rem, 1rem + 0.5vw, 1.125rem);
}

/* Or media queries */
@media (max-width: 768px) {
    body {
        font-size: 16px;
    }
}
Touch Targets Too Small
Problem: Buttons hard to tap

Solutions:

css
button, a, .clickable {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 16px;
}

/* Increase tap area */
.small-button {
    position: relative;
}

.small-button::after {
    content: '';
    position: absolute;
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
}
Images Not Responsive
Problem: Images overflow or don't scale

Solution:

css
img, video, iframe {
    max-width: 100%;
    height: auto;
}
Hover Effects on Touch
Problem: Hover states get stuck on mobile

Solutions:

css
/* Remove hover on touch devices */
@media (hover: hover) {
    .button:hover {
        background: blue;
    }
}

/* Or use :focus-visible */
.button:focus-visible {
    outline: 2px solid blue;
}
Debugging Tools
CSS Debug Outlines
css
/* Show all containers */
* {
    outline: 1px solid rgba(255, 0, 0, 0.2);
}

/* Show current breakpoint */
body::before {
    content: "Mobile";
    position: fixed;
    bottom: 0;
    left: 0;
    background: black;
    color: white;
    padding: 4px 8px;
    font-size: 12px;
    z-index: 9999;
}

@media (min-width: 768px) {
    body::before {
        content: "Tablet";
    }
}

@media (min-width: 1024px) {
    body::before {
        content: "Desktop";
    }
}
JavaScript Debug Tools
javascript
// Log viewport size
window.addEventListener('resize', () => {
    console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
});

// Check for overflow
const hasScroll = document.body.scrollWidth > window.innerWidth;
console.log(hasScroll ? 'Has horizontal scroll' : 'No scroll');

// Get device info
console.log({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
    orientation: screen.orientation.type
});
Performance Testing
Lighthouse in DevTools
Open DevTools → Lighthouse tab

Select device (Mobile/Desktop)

Click "Generate report"

Check scores for:

Performance

Accessibility

Best Practices

SEO

Network Throttling
Open DevTools → Network tab

Select throttle preset:

Slow 3G (50ms RTT, 400kbps down)

Fast 3G (30ms RTT, 1.6Mbps down)

4G (20ms RTT, 4Mbps down)

Reload and test

Real Device Testing
Options
BrowserStack: Cloud device testing

Sauce Labs: Cross-browser testing

Local tunnel: Expose local server to mobile device

USB debugging: Connect Android device

Remote inspector: Safari/iOS remote debugging

Quick Local Testing
bash
# Start local server
python -m http.server 8000

# Find your IP address
ipconfig (Windows) or ifconfig (Mac/Linux)

# Open on mobile: http://YOUR_IP:8000