const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  plugins: false,
  viewportWidth: 1000,
  viewportHeight: 660,
  //watchForFileChanges: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// const { defineConfig } = require('cypress')

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: src/index.html,
//   },
// })
