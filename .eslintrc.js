module.exports = {
  "extends": "airbnb",
  "plugins": ["react", "import"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    "sourceType": "module",
  },
  "rules": {
    "no-console": 0,
    "quotes": [2, "single", {"avoidEscape": true}],
    "semi": [2, "never"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "varsIgnorePattern": "PropTypes" }],
    "react/jsx-uses-react": 'error',
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-first-prop-new-line": 0,
    "jsx-quotes": [2, "prefer-single"],
    "import/no-unresolved": [0, { commonjs: true, amd: true }],
    "global-require": 0,
    "quote-props": [2, "as-needed"],
    "max-len": [1, 120],
    "no-unused-expressions": [2, { "allowShortCircuit": true, "allowTernary": true }],
    "no-confusing-arrow": 0,
    "no-use-before-define": [2, { "functions": true }],
    "no-param-reassign": ["error", { "props": false }],
    "consistent-return": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "no-restricted-syntax": [2, "WithStatement"],
    "no-continue": 0,
    "babel/arrow-parens": 0,
    "generator-star-spacing": 0,
    "react/jsx-no-duplicate-props": [2],
    "react/jsx-no-bind": [2],
    "react/jsx-space-before-closing": [1, "always"],
    "jsx-a11y/no-static-element-interactions": 0,
    "no-multiple-empty-lines": [1, { "max": 1 }],
    "no-mixed-operators": 0,
    "import/extensions": 0,
    "react/forbid-prop-types": 0,
    "class-methods-use-this": 0,
  },
  "parser": "babel-eslint",
  "settings": {
    "import/resolve": {
      "moduleDirectory": ["node_modules", "src"]
    }
  }
}