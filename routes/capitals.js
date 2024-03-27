const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all capital cities
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM capitals ORDER BY population DESC');
        res.render('capitals/list', { capitals: result.rows });
    } catch (error) {
        console.error(`Failed to fetch capitals: ${error.message}`);
        res.status(500).send('Server error');
    }
});

// Get capital city by country
router.get('/:countryName', async (req, res) => {
    try {
        const { countryName } = req.params;
        const result = await db.query('SELECT * FROM capitals WHERE country_name = $1', [countryName]);
        res.render('capitals/detail', { capital: result.rows[0] });
    } catch (error) {
        console.error(`Failed to fetch capital for country ${req.params.countryName}: ${error.message}`);
        res.status(500).send('Server error');
    }
});

module.exports = router;
