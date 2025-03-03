# Exchange rate app

- Run in development
- Run in preview, first build `npm run build` and then preview `npm run preview`
- Run in production

## Development phase and Production phase

### 1️⃣ Development Phase (npm run dev)

In development phase, `main.ts` is used in `index.html`:
`<script type="module" src="/src/main.ts"></script>`

- Vite dynamically compiles TypeScript (.ts) into JavaScript (.js) in memory.
- The browser never actually loads main.ts; instead, Vite intercepts the request and serves a compiled JS version.

### 2️⃣ Production Phase (npm run build)

- When running npm run build, Vite:
  1. Compiles main.ts into dist/assets/main-XYZ123.js.
  2. Updates index.html to reference the built JavaScript file: `<script type="module" crossorigin src="/currency-converter/assets/main-XYZ123.js"></script>`
  3. Places all output files into the dist/ folder.
