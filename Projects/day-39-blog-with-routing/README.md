# Blog with Routing - Day 39 Project

## Project Overview
A fully functional blog application demonstrating React Router for multi-page navigation, dynamic routes, and programmatic navigation.

## Technologies Used
- React 18
- React Router DOM v6
- CSS Modules
- Fetch API (JSONPlaceholder)

## Features

### Routing Features ✅
- Home page listing all blog posts
- Individual post page with dynamic route (/post/:id)
- About page
- Contact page with form
- 404 page for unknown routes
- Active link styling with NavLink
- Programmatic navigation (back button)

### Blog Features ✅
- Fetch posts from JSONPlaceholder API
- Loading skeleton while fetching
- Next/Previous post navigation
- Back to Home button
- Error handling for invalid post IDs

## File Structure
src/
├── components/
│ ├── Navbar.jsx
│ └── PostCard.jsx
├── pages/
│ ├── HomePage.jsx
│ ├── PostPage.jsx
│ ├── AboutPage.jsx
│ ├── ContactPage.jsx
│ └── NotFoundPage.jsx
├── hooks/
│ └── useFetch.js
├── App.jsx
└── main.jsx

text

## Setup Instructions

```bash
cd day-39-blog-with-routing
npm install
npm run dev
Routes
Path	Component	Description
/	HomePage	List of all blog posts
/post/:id	PostPage	Individual post view
/about	AboutPage	About information
/contact	ContactPage	Contact form
*	NotFoundPage	404 page


Key Concepts Demonstrated
BrowserRouter for routing context

Routes and Route for route definitions

Link and NavLink for navigation

useParams for URL parameters

useNavigate for programmatic navigation

Nested layouts

404 handling