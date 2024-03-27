import mysql from "mysql/promises";

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

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (replace with your actual authentication logic)
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      // Redirect to home page upon successful login
      res.redirect('/home');
  } else {
      // Handle invalid credentials (e.g., render login page with error message)
      res.render('login', { error: 'Invalid username or password' });
  }
});

// Create a route for root
app.get("/login", (req, res) => {
  res.render("login");
});

// Create a route for root
app.get("/home", (req, res) => {
  res.render("home");
});

// Create a route for root
app.get("/reports", (req, res) => {
  res.render("reports");
});

app.get("/cities", async (req, res) => {
  try { 
    const [rows, field] = await db.execute("SELECT * FROM `city`");
    return res.render("cities", {rows, fields});
  } catch(err) {
    console.error(err);
  }
});

// Create a route for root
app.get("/about", (req, res) => {
  res.render("about");
});

// Run server!
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  