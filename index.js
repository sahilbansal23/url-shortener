const express = require("express");
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
const { connectDB } = require("./connect");
require("dotenv").config();

connectDB(process.env.DATABASE_URL).then((result) => {
  if (result) {
    console.log("connected to mongodb");
  }
});

app.use(express.json());// to parse the incoming requests
const shorturlspi = require("./routes/url");

// Sample route

app.use("/api", shorturlspi);

app.use("/", (req, res) => {
  res.send("Hello World!");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
