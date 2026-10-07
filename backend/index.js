require("dotenv").config();

const cors = require("cors");
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(apiRoutes);

app.listen(port, () => {
  console.log(`Serveur YELE Immobilier démarré sur le port ${port}`);
});