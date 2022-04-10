//************* Importations***************** */

const express = require('express');
//on appelle express avec cette const et qui permet de créer l'application express
const app = express();
// importation de mongoose
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoute');


mongoose.connect('mongodb+srv://Yves91700:Open91700@cluster0.8gwkp.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const Sauce = require('./models/sauce');


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

// route post pour envoyer une nouvelle sauce 
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(200).json({message:'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error }));
    });
  
// route get implementer afin de recuperer une sauce specifique
app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch( error => res.status(404).json({ error}));
});


//route get implementer afin qu'elle renvoie tous les sauces dans la base de données
app.get('/api/sauces', (req, res, next) => {
   Sauce.find()
   .then(sauces => res.status(200).json(sauces))
   .catch( error => res.status(400).json({ error })); 
  });

  



app.use('/api/auth', userRoutes);






//***************** Exportation*************** */
// on export avec module.export pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app; 