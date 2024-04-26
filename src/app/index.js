const express = require("express");
const mysql = require("mysql2/promise"); // Use promise version of mysql2

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static("public")); // Assuming your CSS files are in 'public' folder

// Setup your database connection details
const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Your existing routes ...

// Route for city report
app.get("/city", async (req, res) => {
  try {
    const [cities] = await pool.query("SELECT * FROM `city`");
    res.render("city", { cities });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving city data");
  }
});

// Route for country report
app.get("/country", async (req, res) => {
  try {
    const [countries] = await pool.query("SELECT * FROM `country`");
    res.render("country", { countries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving country data");
  }
});

// Route for language report
app.get("/language", async (req, res) => {
  try {
    const [languages] = await pool.query(`
      SELECT CountryCode, Language, IsOfficial, Percentage 
      FROM countrylanguage
    `);
    res.render("language", { languages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving language data");
  }
});

// Your existing route for cities should be adjusted to match the updated SQL structure.
// I've corrected it to reflect the latest structure and query logic:
app.get("/cities", async (req, res) => {
  try {
    const [cities] = await pool.query(`
      SELECT city.ID, city.Name, city.CountryCode, city.District, city.Population, country.Name as CountryName
      FROM city
      JOIN country ON city.CountryCode = country.Code
    `);
    res.render("city", { cities });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving city data");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
