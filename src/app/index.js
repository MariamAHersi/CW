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

//Serve assets from 'public' folder
app.use(express.static("public"));

// Dummy users for authentication (replace with your actual logic)
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" }
];

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

// Create a route for login page 
app.get("/login", (req, res) => {
  res.render("login");
});

// Create a route for home page 
app.get("/home", (req, res) => {
  res.render("home");
});

// Create a route for reports page 
app.get("/reports", (req, res) => {
  res.render("reports");
});

// Create a route for cities page
app.get("/cities", async (req, res) => {
  try { 
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'your_database'
    });

    const [rows, fields] = await connection.execute("SELECT * FROM `city`");
    await connection.end(); // Close the connection after query execution
    return res.render("cities", { rows, fields });
  } catch(err) {
    console.error(err);
  }
});

// Create a route for about page 
app.get("/about", (req, res) => {
  res.render("about");
});

// Run server!
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  