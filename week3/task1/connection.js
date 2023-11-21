const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rahmat15",
    database: "pg_data"
});

module.exports = client;