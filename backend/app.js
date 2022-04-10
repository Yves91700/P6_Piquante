//************* Importations***************** */

const express = require('express');
//on appelle express avec cette const et qui permet de créer l'application express
const app = express();
// importation de mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Yves91700:Open91700@cluster0.8gwkp.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




//***************** middleware ***************** */
// express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req  
app.use(express.json());


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

// route post
app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });


//route de l'api
app.get('/api/sauces', (req, res, next) => {
    console.log(req.body);
    
    res.status(200).json({message:'merci'});
  });

  










//***************** Exportation*************** */
// on export avec module.export pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app; 