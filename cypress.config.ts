import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173', // adjust if your app runs on a different port
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',  // or false if you don't use a support file
    },
});
