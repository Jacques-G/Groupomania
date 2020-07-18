const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Token de protection
const bcrypt = require('bcrypt'); // Protection du mot de passe utilisateur
const models = require('../models');
const user = require('../models/user');


exports.limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 2
});

exports.signup = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const poste = req.body.poste;

    if( firstName === null || lastName === null || email === null || password === null || poste === null) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs.'})
    }
    ////////////////////////////////////////////////////
    ////// VOIR POUR INTEGRER REGEX DE VALIDATION //////
    ///////////////////////////////////////////////////

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(function(userFound) {
        if(!userFound) {
            bcrypt.hash(password, 10, function(err, bcryptedPassword) {
                let newUser = models.User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: bcryptedPassword,
                    poste: poste,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({ 'userId': newUser.id})
                })
                .catch(function(err) {
                    return res.status(500).json({ err });
                });
            });
            
        } else {
            return res.status(409).json({ message : " L'utilisateur existe déjà !"})
        }
    })
    .catch(error => res.status(500).json({ error }));
   
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    if(email === null || password === null) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs !'})
    }
    ////////////////////////////////////////////////////
    ////// VOIR POUR INTEGRER REGEX DE VALIDATION //////
    ///////////////////////////////////////////////////

    models.User.findOne({
        where: { email: email }
    })
    .then(function(userFound) {
        if(userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id, 
                        token: jwt.sign({userId: userFound.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h'})
                    })
                } else {
                    return res.status(400).json({message: 'Mot de passe incorrect.'})
                }
            })

        }else {
            return res.status(400).json({message: "L'utilisateur n'existe pas dans la BD."})
        }

    })
    .catch(error => res.status(500).json ({ error }));
};