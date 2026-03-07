const express = require("express");
const bodyParser = require("body-parser");

// Importar arquivos de rotas:
const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(placesRoutes);

app.listen(5000);
