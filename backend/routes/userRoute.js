const express = require('express');
const router = express.Router();
// Déclaration et importation du middleware password pour le contrôle mot de passe utilisateur
const password = require('../middleware/password');
// Déclaration et importation du middleware email pour le contrôle de la validité de l'adresse mail
const mail = require("../middleware/email");

// le controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/userControllers');



router.post('/signup', mail, password, userCtrl.signup);
router.post('/login', userCtrl.login);

// on exporte le router
module.exports = router;