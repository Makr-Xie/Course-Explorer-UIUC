# React + TypeScript + Vite

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
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Added Eslint, Pretier, and Husky.

To ensure adherence to coding standards and maintain a clean code format, our project incorporates ESLint and Prettier for code style linting, alongside Husky to enforce these checks before code is pushed to the repository.

- [Eslint Doc](https://eslint.org/docs/latest/use/getting-started)
- [Prettier Doc](https://prettier.io/docs/en/install)
- [Husky Doc](https://typicode.github.io/husky/get-started.html)
  Feel free change the build log in the .husky/pre-commit. XD
  The one I pushed is a little bit aggressive.
- [React Doc](https://react.dev/) !!Important. 

## Added React Router to setup pages
All web pages are under ./src/pages directory. The sub route is defined in the App.tsx file. 
[React Router documentation](https://reactrouter.com/en/main)

## Added Jest with TypeScript support
1. Added jest.config.ts file. 
2. Added ./src/setupTests.ts.
3. Write a text.tsx to test the first group of tests. Checking render effect and TS type schjecks. 
[Jest documentation](https://jestjs.io/docs/getting-started)

## Added TailwindCSS for UI development
 - [TailwindCSS Doc](https://tailwindcss.com/docs/guides/vite)