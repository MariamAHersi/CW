const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM country ORDER BY population DESC');
    res.render('countries/index', { countries: rows });
});

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const { rows } = await db.query('SELECT * FROM country WHERE code = $1', [code]);
    const country = rows[0];
    res.render('countries/show', { country });
});

module.exports = router;
