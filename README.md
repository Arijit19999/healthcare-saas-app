# Healthcare SaaS App

**Live Demo:** [https://healthcare-saas-app.vercel.app/](https://healthcare-saas-app.vercel.app/)

This is a sample front‑end project for a B2B healthcare SaaS platform. The
application is built using **Vite**, **React** and **TypeScript** and uses
[Tailwind CSS](https://tailwindcss.com/) for styling.  State management is
implemented with [Zustand](https://github.com/pmndrs/zustand) and
[Firebase](https://firebase.google.com/) is used for authentication.  The
project includes a login page, a dashboard with simple statistics, an
analytics page, and a patient details page that supports both grid and list
views.

## Prerequisites

Before running the project you will need:

- **Node.js** (version 14 or later)
- **npm** (version 6 or later)

## Getting started

1. **Install dependencies**

   Navigate into the project directory and install the required packages:

   ```bash
   cd healthcare-saas-app
   npm install
   ```

2. **Configure Firebase**

   Create a new project in the [Firebase Console](https://console.firebase.google.com/) and
   enable Email/Password authentication.  Copy your project’s configuration
   values and replace the placeholder values in
   `src/services/firebaseAuth.ts` with your own credentials.

3. **Run the development server**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

4. **Build for production**

   To create an optimized production build, run:

   ```bash
   npm run build
   ```

## Project structure

```
healthcare-saas-app/
├── .gitignore               # Files to ignore in version control
├── README.md                # Project documentation
├── package.json             # Project metadata and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TS config for Vite
├── vite.config.ts           # Vite configuration
├── index.html               # HTML entry point for Vite
└── src/                     # Source files
    ├── index.css            # Global styles (imports Tailwind)
    ├── main.tsx             # Application entry point
    ├── App.tsx              # Routes and global layout
    ├── services/
    │   └── firebaseAuth.ts  # Firebase configuration and helpers
    ├── store/
    │   └── useStore.ts      # Zustand store
    ├── utils/
    │   └── helpers.ts       # Utility functions
    ├── components/
    │   ├── Button.tsx       # Styled button component
    │   ├── Modal.tsx        # Simple modal component
    │   └── Navbar.tsx       # Top navigation bar
    └── pages/
        ├── LoginPage.tsx    # Login form
        ├── DashboardPage.tsx# Dashboard with sample stats
        ├── AnalyticsPage.tsx# Placeholder for analytics
        └── PatientDetailsPage.tsx
                             # Grid/list view of patient data
```

## License

This project is provided as a learning resource under the MIT License.