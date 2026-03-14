require("dotenv").config();
const mysql = require("mysql2/promise");

// No mysql2, usamos createPool diretamente
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exportamos o pool com suporte a Promises para usar async/await
module.exports = pool; //.promise();
