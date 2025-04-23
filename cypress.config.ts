import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Default Vite port is 5173
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // You can optionally pass your Vite config here
      // viteConfig: './vite.config.ts'
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
  },
  video: true, // Enable video recording
});
