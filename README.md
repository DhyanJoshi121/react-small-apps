
# React Course

The project is inspired from react course by Mrinal Bhattacharya.
for more info about course you can checkout https://www.scaler.com/

With this project I am trying to make trip planner type of website.
Currently on homepage you will find amazing places with view and In planner you can add your plans, mark them as checked and removed them if you don't need them anymore.

We will soon add price and watchlist/favorite feature. be sure to lookout for our new updates.

## Run Locally

Clone the project

```bash
  git clone https://github.com/DhyanJoshi121/react-small-apps.git
```

Go to the project directory

```bash
  cd react-small-apps
```


Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
