module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    options: {
      emitWarning: true,
      failOnWarning: false,
    },
    "object-curly-newline": ["error", { multiline: true }],
    "vue/no-unused-vars": "warn",
    "no-nested-ternary": "off",
    "no-lonely-if": "off",
    "no-shadow": "off",
    "comma-dangle": "off",
    "object-curly-brace": "off",
    "no-confusing-arrow": "off",
    "import/prefer-default-export": "off",
    "padded-blocks": "off",
    "arrow-body-style": "off",
    "no-unused-expressions": "off",
    "prefer-destructuring": ["error", {
      "array": false,
    }],
    "max-len": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "linebreak-style": 0,
    "object-shorthand": ["error", "always", { ignoreConstructors: true }],
    // Permite la reasignación de parámetros en funciones
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"]
      }
    ],
    // Permite usar v-if en bucles v-for
    "vue/no-use-v-if-with-v-for": [
      {
        allowUsingIterationVar: false
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};