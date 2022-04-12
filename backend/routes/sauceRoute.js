const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require('../middleware/auth');
const SauceCtrl = require("../controllers/sauceControllers");
// route post pour envoyer une nouvelle sauce
router.post("/", auth, multer, SauceCtrl.createSauce);

// route pour modifier une sauce
router.put("/:id", auth, multer, SauceCtrl.updateSauce);

//route get implementer afin qu'elle renvoie tous les sauces dans la base de données
router.get("/", auth, SauceCtrl.getAllSauces);

// route get implementer afin de recuperer une sauce specifique
router.get("/:id", auth, SauceCtrl.getOneSauce);

//route pour supprimer une sauce
router.delete("/:id", auth,  SauceCtrl.deleteSauce);

//*************** exportation du router************ */
module.exports = router;
