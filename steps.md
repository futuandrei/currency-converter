# Steps

- Installed dotenv dependencies
- Created vite.config.ts
- Updated script in index html to include module
- Installed gh-pages

Install dotenv to load environment variables `npm install dotenv`

dotenv.config();
"Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`."

Changed in package.json

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
```

to

```json

```

## Created vite.config.ts

## Updated tsconfig.json

This:

```json
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
```

To this:

```json
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "target": "ES6",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "resolveJsonModule": true,
    "esModuleInterop": true
```

## Script module

`<script type="text/javascript" src="src/main.ts"></script>` to:
`<script type="module" src="/src/main.ts"></script>`
