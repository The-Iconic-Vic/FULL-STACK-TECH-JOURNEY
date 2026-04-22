# User Profile Gallery - Day 31 Project

## Project Overview
A responsive user profile gallery demonstrating:
- Passing props to components
- Destructuring props
- Default props values
- Passing functions as props
- Array mapping for dynamic rendering
- Children prop for wrapper components

## File Structure
day-31-user-profile-gallery/
├── src/
│ ├── components/
│ │ ├── UserCard.jsx
│ │ ├── UserCard.module.css
│ │ ├── Button.jsx
│ │ ├── Button.module.css
│ │ ├── Container.jsx
│ │ └── Container.module.css
│ ├── App.jsx
│ ├── App.module.css
│ └── main.jsx
├── package.json
├── index.html
└── README.md

text

## Components

| Component | Purpose | Props |
|-----------|---------|-------|
| App | Main container, user data | None |
| UserCard | Display user profile | name, age, email, avatar, location, bio, followers, isFollowed, onFollowToggle |
| Button | Reusable button | variant, size, disabled, onClick, children |
| Container | Layout wrapper | children |

## Props Demonstrated

| Prop Type | Example |
|-----------|---------|
| String | `name="Alice"` |
| Number | `age={28}` |
| Boolean | `disabled={true}` |
| Array | `users.map()` |
| Function | `onFollowToggle={handleFollow}` |
| Children | `<Button>Click me</Button>` |

## Setup Instructions

```bash
cd day-31-user-profile-gallery
npm install
npm run dev