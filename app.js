const express = require("express");
const pool = require("./database/connection");
const placesRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");

const app = express();
app.use(express.json());

// Rota raiz para teste de vida do servidor
app.get("/", (req, res) => {
  res.send(`<h1>Servidor Vivo!</h1>`);
});

// app.use("/todos", placesRoutes);
// app.use("/users", usersRoutes);

// const initDb = async () => {
//   const queryText = `
//     CREATE TABLE IF NOT EXISTS users_mern1 (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       first_name VARCHAR(50) NOT NULL,
//       last_name VARCHAR(50) NOT NULL,
//       email VARCHAR(50) UNIQUE,
//       password VARCHAR(255) NOT NULL,
//       is_active INT DEFAULT 1,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;
//   try {
//     console.log("Tentando inicializar tabelas...");
//     await pool.query(queryText);
//     console.log("Tabelas verificadas/criadas com sucesso.");
//   } catch (err) {
//     console.error("Erro ao inicializar banco:", err.message);
//   }
// };

// A MUDANÇA ESTÁ AQUI:
app.listen(5000, "0.0.0.0", () => {
  console.log("Server rodando na porta 5000");

  // O banco inicializa aqui "por fora" do fluxo principal
  // initDb();
});
