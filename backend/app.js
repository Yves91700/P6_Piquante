//************* Importations***************** */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//*************************************** déclaration et importation des routes**************************** */
const sauceRoutes = require("./routes/sauceRoute");
const userRoutes = require("./routes/userRoute");
//*************************************** Modules complémentaire*************************************************** */

// importation de morgan "http request logger"
const morgan = require("morgan");



// importation du module express-mongo-sanitize qui nettoie les données fournies par l'utilisateur pour empêcher des injections sql vers mongoDB
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

// Importation du module dotenv pour utiliser les variables d'environnement écrites dans le  fichier .env dans le répertoire racine du dossier backend
require('dotenv').config();

//****************************************************** DATA BASE ************************************************ */
mongoose
  .connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
    
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//on appelle express avec cette const et qui permet de créer l'application express
const app = express();

//************** Cross Origin Ressource Sharing (CORS)*************************************************************************** */

// log des request et des response
app.use(morgan("dev"));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  
  next();
});

//******************************************************************************************************************************* */

// express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req
app.use(express.json());

app.use(bodyParser.json());

//protection injection sql qui remplace les caractères interdits "$" et "." par _
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);


app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//***************** Exportation*************** */
// on export avec module.export pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app;
