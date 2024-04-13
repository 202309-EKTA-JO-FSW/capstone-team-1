const cron = require("node-cron");

const keepAwake = cron.schedule(
  "*/14 * * * *",
  () => {
    // Simulate a request to keep the app awake (replace with your actual logic)
    console.log("Pinging server to prevent sleep...");
    fetch("https://your-app-url/ping"); // Or use an HTTP library like Axios
  },
  {
    scheduled: false, // Set to true to start the cron job automatically
  }
);

keepAwake.start();
