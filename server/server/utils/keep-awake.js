const cron = require("node-cron");
const fetch = require("node-fetch");

const keepAwake = cron.schedule(
  "*/14 * * * *",
  () => {
    // Simulate a request to keep the app awake (replace with your actual logic)
    console.log("Pinging server to prevent sleep...");
    fetch("https://your-app-url/ping") // Or use an HTTP library like Axios
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Server pinged successfully");
      })
      .catch((error) => {
        console.error(
          "There was a problem with the server ping:",
          error.message
        );
      });
  },
  {
    scheduled: false, // Set to true to start the cron job automatically
  }
);

keepAwake.start();
