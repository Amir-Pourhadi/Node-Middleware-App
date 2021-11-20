const express = require("express");
const path = require("path");
const fs = require("fs");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Send files middleware
app.use((req, res, next) => {
  const filepath = path.join(__dirname, "static", req.url);
  fs.stat(filepath, (err, stats) => {
    if (err) {
      return next();
    } else if (stats.isFile()) {
      res.sendFile(filepath);
    } else {
      next();
    }
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("404: File Not Found!");
});

// Listen on the port
app.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`);
});
