const pool = require("./connection");

const initDb = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS rememorize_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE,
      password VARCHAR(255) NOT NULL,
      isActive INT DEFAULT 1,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(queryText);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { initDb };
