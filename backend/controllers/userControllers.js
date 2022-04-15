// importation

const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js"); //Déclaration et importation du package crypto-js pour chiffrer déchiffrer l'email dans la base de donnée
require('dotenv').config();


// fonctions pour 
exports.signup = (req, res, next) => {
//chiffrer l'email dans la base de donnée
const emailCryptoJs = cryptojs
.HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
.toString();

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: emailCryptoJs,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};




exports.login = (req, res, next) => {
  const emailCryptoJs = cryptojs
  .HmacSHA512(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`)
  .toString();

    User.findOne({ email: emailCryptoJs })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };