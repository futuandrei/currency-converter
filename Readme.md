# Exchange rate app

This is just a tiny change for testing...

## Project structure

```
📂 project-root/
├── 📂 dist/
│   ├── 📂 assets/
│   │   ├── index-COpLazOd.js
│   ├── index.html
├─── 📂 node_modules/
├─── 📂 public/
├─── 📂 src/
│    ├── index.html
│    ├── main.js
│    ├── main.ts
│    ├── style.css
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── Readme.md
├── tsconfig.json
├── vite.config.ts

```

## Ways to run project

- Run in development
- Run in production
- Run in preview, first build `npm run build` and then preview `npm run preview`

## Development phase and Production phase

### 1️⃣ Development Phase (npm run dev)

📂 Vite serves files form `src/folder`

In development phase, `main.ts` is used in `index.html`:
`<script type="module" src="/src/main.ts"></script>`

- Vite dynamically compiles TypeScript (.ts) into JavaScript (.js) in memory.
- The browser never actually loads main.ts; instead, Vite intercepts the request and serves a compiled JS version.

### 2️⃣ Production Phase (npm run build)

- When running npm run build, Vite:
  1. Compiles main.ts into dist/assets/main-XYZ123.js.
  2. Updates index.html to reference the built JavaScript file: `<script type="module" crossorigin src="/currency-converter/assets/main-XYZ123.js"></script>`
  3. Places all output files into the dist/ folder.

### 📺 Preview phase (npm run preview)

📂 Vite serves files form `dist/folder`
