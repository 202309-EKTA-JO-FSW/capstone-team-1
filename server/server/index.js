// const express = require("express");
// const cors = require("cors");
// const apiRoutes = require("./routes");

require("dotenv").config();

const connectToMongo = require("./db/connection");
const app = require("./utils/server");

// const app = express();

const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// main route
// app.use("/api", apiRoutes);

// app.get("/test", (req, res) => {
//   res.send("testiinnng!!!");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
