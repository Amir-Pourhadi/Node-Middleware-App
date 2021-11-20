const express = require("express");
const path = require("path");
const fs = require("fs");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Listen on the port
app.listen(port, () => {
  console.info(`Listening on http://localhost:3000/${port}`);
});
