# Project Rules and Tasks

## Rules

1. Do not change the interface of the app unless you are doing it for functionality.

## Tasks

- [x] Set up a new Vite React project (with TypeScript and Tailwind CSS)
- [x] Remove all Next.js-specific dependencies and configuration files
- [x] Identify all pages and routes to migrate (app/page.tsx, app/layout.tsx, app/dashboard/page.tsx, app/goal/[id]/page.tsx)
- [x] Migrate pages from the `app/` directory to React Router structure (React Router installed, routes scaffolded)
- [x] Migrate Home page to Vite React app
- [x] Update routing to use React Router instead of Next.js file-based routing
- [x] Move and adapt layouts and shared components (Layout component created and used)
- [x] Migrate Dashboard page to Vite React app
- [x] Migrate Goal page (dynamic route) to Vite React app
- [x] Update dynamic routes (e.g., `[id]`) to React Router params
- [x] Move global styles and Tailwind config (globals.css migrated and imported)
- [x] Update asset imports (images, etc.) to Vite conventions
- [x] Refactor any Next.js-specific code (e.g., `getServerSideProps`, `getStaticProps`, etc.)
- [x] Update environment variables and configuration for Vite
- [x] Install all required dependencies for UI components (Radix UI, class-variance-authority, react-day-picker, etc.)
- [x] Update Vite and tsconfig to support @ path alias (or update imports to relative paths)
- [x] Test all functionality to ensure parity with the original app
- [x] Update README and documentation for the new setup

---

- [x] Add user authentication and accounts (Google sign-in, sign-out, personalized dashboard)
    - [x] Choose and install an authentication library (Firebase Auth)
    - [x] Set up authentication provider and configuration
    - [x] Implement Google sign-in button on the landing page
    - [x] Store user info (name, email, avatar) on login
    - [x] Implement sign-out functionality
    - [x] Protect dashboard and goal routes (redirect if not signed in)
    - [x] Display "Welcome back, [Gmail first name]" in the dashboard header
    - [x] Test authentication flow (sign in, sign out, route protection, greeting)

## [x] Unify Home Page Authentication Entry Points
- [x] Make 'Login with Google' button trigger Google sign-in and redirect to dashboard
- [x] Make 'Get Started—It's Free' button trigger Google sign-in and redirect to dashboard
- [x] Make 'Start Your First Goal' button trigger Google sign-in and redirect to dashboard
- [x] Refactor code to avoid duplication (use a single handler)
- [ ] Test all buttons for correct behavior (requires manual browser testing by user)

## [ ] Fix Home Page Sign-In Flow
- [x] Remove auto-redirect to /dashboard on Home page
- [x] Always show sign-in buttons, even if user is signed in
- [x] Update button handler to always prompt Google sign-in and redirect after success
- [ ] Test the new sign-in flow for all three buttons 

## Gemini-Powered Goal Step & Timeline Suggestions
- [x] Integrate Gemini API for AI-powered suggestions
- [x] Add UI to trigger Gemini suggestions when creating a goal
- [x] Display 3-5 suggested steps and a suggested timeline for the goal
- [ ] Allow user to accept or edit suggested steps/timeline
- [ ] Save accepted steps/timeline to the goal
- [ ] Test and polish the feature 