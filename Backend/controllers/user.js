const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Token de protection
const bcrypt = require('bcrypt'); // Protection du mot de passe utilisateur
const models = require('../models');
const user = require('../models/user');
const asyncLib = require('async'); //Voir pour utiliser ou pas

//CONSTANTES REGEX
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwRegex = /^(?=.*\d).{4,8}$/;
//MIDDLEWARE 
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
    if(firstName.length >= 15 || firstName.length <= 2) {
        return res.status(400).json({ message: 'Votre prénom doit comprendre entre 2 et 15 lettres'})
    }
    
    if(lastName.length >= 15 || lastName.length <= 2) {
        return res.status(400).json({ message: 'Votre nom doit comprendre entre 2 et 15 lettres'})
    }
    
    if(!emailRegex.test(email)) {
        return res.status(400).json({ message: "email invalide !"})
    }

    if(!pwRegex.test(password)) {
        return res.status(400).json({ message : 'Votre mot de passe doit contenir entre 4 et 8 caractère et contenir au moins 1 nombre'})
    }

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

exports.getProfile = (req, res, next) => {
    const email = req.body.email;

    models.User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'poste'],
        where: { email: email }
    })
    .then( User => {
        if(User) {
            return res.status(200).json({ User });
        }
        return res.status(400).json({ error });
    })
    .catch(error => res.status(400).json({ error}));
};


exports.updateProfil = (req, res, next) => {
    const email = req.body.email;

    models.User.findOne({
        where: { email: email }
    })  
    .then(function(userFounded) {
        if(userFounded) {
            const poste= req.params.poste;

            userFounded.update({
                poste: (poste ? poste: req.body.poste)
            })
            .then(res.status(200).json({ User, message: "Profil modifié !"}))
        }
        return res.status(400).json({ message: "Impossible de modifier votre profil."})
    })
    .catch(res.status(400).json({ message: "Utilisateur introuvable"}))
};


exports.deleteUser = (req, res, next) => {
    const email = req.body.email;

    models.User.findOne({
        where: { email: email}
    })
    .then(function(userFounded) {
        if(userFounded) {
            models.message.destroy({ where: { email: email }})
            .then(userFounded => {
                models.User.destroy({ userId: userFounded.id})
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        }else {
            returnres.status(400).json({ error });
        }
    })
    .catch( error => res.status(400).json({ error, message: 'Impossible de supprimé le compte.'}))
    /*.then(user => {
        if(user) {
            models.Message.destroy({ where: { email: email }})
            .then(() => {
                models.User.destroy({ userId: user.id})
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        }else {
            return res.status(400).json({ error });
        }
    })
    .catch( error => res.status(400).json({ error, message: 'Impossible de supprimé le compte.'}))*/
};