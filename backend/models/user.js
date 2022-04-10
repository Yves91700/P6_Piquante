const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// mongoose-unique-validator passé comme plug-in afin de s'assurer que deux utilisateurs ne puissent partarger la meme adresse e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User, userSchema');