const express = require('express');
const router = express.Router();

// le controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/userControllers');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// on exporte le router
module.exports = router;