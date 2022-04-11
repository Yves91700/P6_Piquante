const express = require('express');
const router = express.Router();
const SauceCtrl = require('../controllers/sauceControllers');


//route get implementer afin qu'elle renvoie tous les sauces dans la base de données
router.get('/', SauceCtrl.getAllSauces);

// route get implementer afin de recuperer une sauce specifique
router.get('/:id', SauceCtrl.getOneSauce);

// route post pour envoyer une nouvelle sauce 
router.post('/', SauceCtrl.createSauce); 
  
// route pour modifier une sauce
router.put('/:id', SauceCtrl.updateSauce);

//route pour supprimer une sauce
router.delete('/:id', SauceCtrl.deleteSauce);
  
  
  
  
  
  
  
  
  
    
  
  
    //*************** exportation du router************ */
    module.exports = router;