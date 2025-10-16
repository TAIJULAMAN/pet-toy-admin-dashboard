# Pet Toy Admin Dashboard

A modern admin dashboard built with React, Vite, Tailwind CSS, and Ant Design.

## Tech Stack

- **Build**: Vite `^6`
- **Framework**: React `^18`
- **UI**: Ant Design `^5`
- **Styling**: Tailwind CSS `^4` (via `@tailwindcss/vite` plugin)
- **Routing**: React Router `^7`
- **Charts**: Recharts
- **Dates**: Day.js
- **Rich Text**: React Quill

## Project Structure

```
.
├─ index.html
├─ vite.config.js
├─ public/
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ assets/
│  ├─ components/
│  ├─ layout/
│  ├─ pages/
│  └─ routes/
└─ vercel.json
```

- **`src/main.jsx`**: App bootstrap, React root rendering.
- **`src/App.jsx`**: Root app component.
- **`src/routes/`**: Route configuration and protected routes (if any).
- **`src/pages/`**: Page-level components.
- **`src/components/`**: Reusable UI components.
- **`src/layout/`**: Shared layouts, navigation shells, etc.
- **`index.css`**: Global styles; Tailwind layers are applied here.

## Styling

- Tailwind CSS v4 is configured through the Vite plugin `@tailwindcss/vite` in `vite.config.js`.
- Use utility classes in components. Add global styles or `@layer` rules in `src/index.css`.


## Environment Variables

- Vite exposes env variables prefixed with `VITE_`.
- Create a `.env` (and/or `.env.local`) at the project root, for example:


## Deployment

- This repo includes `vercel.json` for deployment on Vercel.
- Typical flow:
  - Push to GitHub/GitLab/Bitbucket.
  - Import the repo in Vercel, set any required `VITE_` env vars.
  - Vercel will run `npm run build` and serve the output.

## License

This project is provided as-is. Add a license file if you intend to distribute.