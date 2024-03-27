/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");

/* Create express instance */
const app = express();
const port = 3000;

// Intergrate Pug with Express 
app.set('view engine', 'pug');

//Serve assets from 'static' folder
app.use(express.static("static"));

// Create a route for root
app.get("/", function(req, res) => {
  res.render("index"),
});

// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM `city`", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});

// Run server!
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  