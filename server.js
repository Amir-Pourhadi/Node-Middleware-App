const express = require("express");
const path = require("path");
const fs = require("fs");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Serve ejs files from the views directory
app.set("view engine", "ejs");

// Show date in console
app.use((req, res, next) => {
  const date = new Date();
  console.log(`Request Time: ${date.getHours()}:${date.getMinutes()}`);
  next();
});

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

// Render home page
app.get("/", (req, res) => {
  res.status(200).render("base");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("File Not Found!");
});

// Listen on the port
app.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`);
});
