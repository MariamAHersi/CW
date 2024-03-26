/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");

/* Create express instance */
const app = express();
const port = 3000;

/* Landing route */
app.get("/", (req, res) => {
    res.send("Hello world!");
  });

// Run server!
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  