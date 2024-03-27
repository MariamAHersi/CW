const { Pool } = require('pg');
const pool = new Pool({
    user: 'yourUsername',
    host: 'localhost',
    database: 'world',
    password: 'yourPassword',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
