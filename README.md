# School Website Front End

A frontend application built with React.js as part of my learning process in modern web development. It simulates a School Gradebook system with pages for managing students, teachers, authentication, enrollment, grading, and dashboard data.

The primary goal of this project is to practice and understand core frontend concepts, including:
- Component architecture
- Client side navigation between pages
- API communication and asynchronous data handling
- State management
- Protected routes and authentication flow
- Basic unit testing

# Technologies and Tools
- React.js
- Material UI (UI components and forms)
- TanStack Query (data fetching, caching, loading state management)
- Axios (HTTP client for API communication)
- React Virtuoso (virtualized tables for handling large datasets)
- Vitest (unit testing)

# Architecture
The project is organized in layers to keep it easy to understand and maintain:
- App Layer – Handles page navigation and its layout (App.jsx, routes/pages, layout)
- Components Layer – Contains reusable UI pieces like forms, tables, and modals
- Hooks Layer – `useCalendar` hook for managing dates, weeks and month structure.
- Services Layer – Handles communication with the backend, login/logout, and general API calls

# Features
- User authentication with JWT integration
- Protected routes
- CRUD operations connected to backend API
- Student and teacher listing with virtualized tables
- Dashboard and calendar functionality
- Token management service
- Basic form validation
- Data caching and automatic refetching via TanStack Query

# Authentication & Authorization
The project uses JWT for authentication.
Access tokens are stored locally using `localStorage.setItem("accessToken", accessToken)` to control access to protected routes.
Unauthenticated users can only access public routes, such as the login page.

#Testing
Vitest was used for basic unit testing.
Currently only Login Form tests are covered.
