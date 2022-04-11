//************* Importations***************** */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauceRoute');
const userRoutes = require('./routes/userRoute');


mongoose.connect('mongodb+srv://Yves91700:Open91700@cluster0.8gwkp.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//on appelle express avec cette const et qui permet de créer l'application express
const app = express();


//***************** middleware ***************** */



//************** Cross Origin Ressource Sharing (CORS)*************************************************************************** */

app.use((req, res, next) => {
    //header qui permet d'accéder a notre API depuis n'importe quelle origine avec ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // permet d'envoyer des requêtes avec les methodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//******************************************************************************************************************************* */

// express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req  
app.use(express.json());
app.use(bodyParser.json());



 app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);






//***************** Exportation*************** */
// on export avec module.export pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app; 