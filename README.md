# Ong Shi Nee | Cloud Portfolio Console

A professional, unique portfolio website designed to resemble a **Cloud Infrastructure Console** (inspired by Oracle Cloud Infrastructure). This project showcases cloud expertise, AI workflows, and software development projects through a technical, service-oriented interface.

## 📂 Source File Overview

### Core Application Files
- **`src/App.tsx`**: The "Brain" of the application. It contains the main layout (Sidebar, Header, Main Content) and manages the state for navigation between different "Cloud Services" (Dashboard, Compute, Storage, etc.). It also handles the interactive Cloud Shell logic.
- **`src/main.tsx`**: The entry point that bootstraps the React application and mounts it to the DOM.
- **`src/index.css`**: The styling engine. It imports Tailwind CSS and defines the custom "Console" theme, including OCI-inspired colors (`oci-orange`), glassmorphism effects, and terminal-specific typography.
- **`index.html`**: The base HTML template that serves as the container for the React app.

### Data & Logic
- **`src/constants.ts`**: The "Database" of the portfolio. It stores all the resume content (Work Experiences, Projects, Education, and Skills) in structured objects, making it easy to update your professional information in one place.
- **`src/types.ts`**: Defines the TypeScript interfaces and types used across the project to ensure data consistency and prevent bugs.

### Configuration
- **`vite.config.ts`**: Configures the Vite build tool, including the React and Tailwind CSS plugins, and handles environment variables like the Gemini API key.
- **`metadata.json`**: Contains the application's name and description used by the platform.
- **`package.json`**: Manages all project dependencies and scripts.

---

## 🔗 How Everything Interconnects

The project is built using a **Component-Based Architecture** where different technologies work together seamlessly:

1.  **TypeScript (The Foundation)**: Provides the "contract" between files. For example, `types.ts` defines what a `Project` looks like, `constants.ts` creates the data following that contract, and `App.tsx` consumes it with full autocomplete and error checking.
2.  **React (The Orchestrator)**: Manages the **User State**. When you click a sidebar item, React updates the `currentView` state, which triggers a re-render to show the corresponding "Cloud Service" (e.g., switching from Dashboard to Compute).
3.  **Tailwind CSS (The Visuals)**: Styles are applied directly within `App.tsx` using utility classes. The custom theme defined in `index.css` allows us to use specific colors like `bg-console-bg` or `text-oci-orange` consistently across the entire UI.
4.  **Motion (The Experience)**: Acts as a wrapper around React components. When the `currentView` changes, Motion detects the change and applies the `AnimatePresence` transitions (fade-in/out) to make the console feel fluid and high-end.
5.  **Lucide React (The Visual Language)**: Provides the icons that give the console its "Cloud" identity. These are imported as React components and used inside the Sidebar and Headers.
6.  **Vite (The Builder)**: Takes all these modern TypeScript, React, and CSS files and "bundles" them into highly optimized JavaScript that the browser can understand and run at lightning speed.

---

## 🚀 Technical Features
- **Interactive Cloud Shell**: A terminal-like interface that logs user actions in real-time.
- **Service-Oriented UI**: Projects and experiences are treated as "Cloud Resources" (Instances, Buckets, VCNs).
- **Responsive Layout**: A sidebar-driven navigation that adapts to different screen sizes.
- **OCI Branding**: A color palette and typography specifically chosen to align with Oracle Cloud Infrastructure standards.
