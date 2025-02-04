const { Pool } = require('pg');
const dotenv = require ('dotenv');

dotenv.config();

const pool = new Pool ({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_NAME,
password: process.env.DB_PASSWORD,
port: parseInt(process.env.DB_PORT, 10)
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error ("Error acquiring client", err.stack);
    }
    client.query("Select NOW()", (err, result) => {
        release();
        if (err) {
            return console.error("Error executing query", err.stack);
        }
        console.log("Connected to PostgresSQL at", result.rows[0].now);
    });
});

module.exports = pool;