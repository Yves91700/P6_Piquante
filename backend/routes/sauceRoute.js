/************************* DECLARATIONS ET IMPORTATIONS  ******************************************/
//importation d'express
const express = require("express");

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require("../middleware/multer-config");

// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi de ses requêtes
const auth = require('../middleware/auth');

// Déclaration et importation du controller sauceControllers et sa logique métier
const SauceCtrl = require("../controllers/sauceControllers");

// Déclaration et importation du controller like et sa logique métier
const likeCtrl = require("../controllers/like");

/********************************* Routers ************************************************** */

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

//Les routes POST pour la gestion des likes
router.post("/:id/like", auth, likeCtrl.likeSauce);


//*************** exportation du router ************ */
module.exports = router;
