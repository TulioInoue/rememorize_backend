require("dotenv").config();

// Importar express:
const express = require("express");

// Importar cors:
const cors = require("cors");

// Importar inicialização das tabelas:
const create = require("./database/create");

// Importar rotas:
const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");

// Importar variáveis de ambiente:
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Define allowed origins
const allowedOrigins = [FRONTEND_URL];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowed list or if there is no origin (e.g., same-origin requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Rota raiz para teste de vida do servidor
app.get("/", (req, res) => {
  res.send(`<h1>Servidor Vivo!</h1>`);
});

app.use("/users", usersRoutes);
app.use("/places", placesRoutes);

if (create.initDb()) {
  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
  });
}
