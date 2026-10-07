const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1000,
    viewportHeight: 660,
    defaultCommandTimeout: 8000,
    video: true,
    screenshotOnRunFailure: true,
    env: {
      apiUrl: "http://localhost:8080/api",
      // Jangan commit kredensial. Set lewat CYPRESS_ADMIN_USER / CYPRESS_ADMIN_PASSWORD
      adminUser: "admin",
      adminPassword: "",
      lecturerUser: "",
      lecturerPassword: "",
      assistantUser: "",
      assistantPassword: "",
    },
  },
});
