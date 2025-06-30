# LittleWins

A modern goal-tracking app with AI-powered step suggestions, built with Vite + React, Firebase Auth, and Gemini AI.


## Features
- Beautiful, modern dashboard UI
- Google sign-in (Firebase Auth)
- Add, view, and track goals
- Gemini AI integration for automatic step & timeline suggestions
- Progress tracking, logs, and completion stats
- Responsive and mobile-friendly

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/OtienoKeith/LittleWins.git
   cd LittleWins/react-vite-app
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
3. **Set up Firebase:**
   - Update `src/lib/firebase.ts` with your Firebase project config if needed.
4. **Set up Gemini API:**
   - Get your Gemini API key from Google AI Studio or Google Cloud Console.
   - Paste it in `src/lib/gemini.ts`:
     ```js
     const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
     ```
5. **Run the app locally:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port Vite reports).

## Deployment

The app is deployed at:
[https://vercel.com/keiths-projects-b824fd1c/v0-littlewins-app-design](https://vercel.com/keiths-projects-b824fd1c/v0-littlewins-app-design)

## Credits
- Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [Firebase](https://firebase.google.com/), and [Gemini AI](https://ai.google.dev/)
- UI inspired by v0.dev

---

For more info, see the [GitHub repo](https://github.com/OtienoKeith/LittleWins).
