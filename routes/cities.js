const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM city ORDER BY population DESC');
    res.render('cities/index', { cities: rows });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM city WHERE id = $1', [id]);
    const city = rows[0];
    res.render('cities/show', { city });
});

module.exports = router;

