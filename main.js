// Load Express
const express = require('express');

// Initialize app with Express
const app = express();

// Set the server port
const PORT = process.env.PORT || 3510;

// Serve files from 'public' folder
app.use(express.static('public'));

// Setup to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Choose Pug for HTML templates
app.set('view engine', 'pug');
app.set('views', './views');

// Import routes
const countryRoutes = require('./routes/countries');
const cityRoutes = require('./routes/cities');
const userRoutes = require('./routes/user');

// Use routes
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/user', userRoutes);

// Homepage route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Start server and listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
