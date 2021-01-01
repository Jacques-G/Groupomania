const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Token de protection
const bcrypt = require('bcrypt'); // Protection du mot de passe utilisateur
const models = require('../models');

const fs = require('fs');
const { measureMemory } = require('vm');




//CONSTANTES REGEX
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwRegex = /^(?=.*\d).{4,8}$/;
//MIDDLEWARE 
exports.limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 2
});

exports.signup = (req, res, next) => { //Inscription au site
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const job = req.body.job;

    if (firstName === null || lastName === null || email === null || password === null || job === null) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs.'});
    }

    if (firstName.length >= 15 || firstName.length <= 2) {
        return res.status(400).json({ message: 'Votre prénom doit comprendre entre 2 et 15 lettres'});
    }
    
    if (lastName.length >= 15 || lastName.length <= 2) {
        return res.status(400).json({ message: 'Votre nom doit comprendre entre 2 et 15 lettres'});
    }
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Votre email est invalide !"});
    }

    if (!pwRegex.test(password)) {
        return res.status(400).json({ message : 'Votre mot de passe doit contenir entre 4 et 8 caractères et contenir au moins 1 nombre'});
    }

    models.User.findOne({ // Je vérifie que l'email n'existe pas déjà
        attributes: ['email'],
        where: { email: email }
    })
    .then((userFound) => {
        if (!userFound) {
            bcrypt.hash(password, 10, function(err, bcryptedPassword) { //Hashage du mot de passe
                let newUser = models.User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: bcryptedPassword,
                    job: job,
                    attachment: null,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    return res.status(201).json({ 'userId': newUser});
                })
                .catch(function(err) {
                    return res.status(500).json({ err });
                });
            });
            
        } else {
            return res.status(403).json({ message : " L'utilisateur existe déjà !"});
        }
    })
    .catch(error => res.status(500).json({ message: "Impossible de créer l'utilisateur.", error }));
   
};

exports.login = (req, res, next) => { // Connexion à un compte existant
    let email = req.body.email;
    let password = req.body.password;

    if(email === null || password === null) {
        return res.status(400).json({ message: 'Veuillez remplir tous les champs !'});
    }

    models.User.findOne({
        where: { email: email }
    })
    .then((userFound) => {
        if(userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id, 
                        token: jwt.sign({userId: userFound.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '2h'})
                    });
                } else {
                    return res.status(401).json({message: 'Mot de passe incorrect.'});
                }
            })

        }else {
            return res.status(404).json({message: "L'utilisateur n'existe pas dans la BD."});
        }

    })
    .catch(error => res.status(500).json ({ error }));
};

exports.getProfile = (req, res, next) => { //Profil Utilisateur

    models.User.findOne({
        attributes: ['firstName', 'lastName', 'email', 'job', 'attachment', 'isAdmin'],
        where: { id: req.params.id }
    })
    .then( User => {
        if(User) {
            return res.status(200).json({ User });
        }else {
            return res.status(400).json({ message: "Impossible de récupérer votre profil utilisateur" });
        }
    })
    .catch(error => res.status(500).json({ error}));
};
exports.updateProfil = (req, res, next) => { // Modification du Profil Utilisateur
    models.User.findOne({
        attributes: ['job', 'attachment', 'id'],
        where: { id: req.params.id}
    })
    .then((userFound) => {
        if (userFound) {
            if (userFound.attachment === undefined || userFound.attachment === null) {
                if (req.file === undefined || req.file === null) {
                    userFound.update({
                        job:  req.body.job,
                        attachment : null
                     })
                     .then(userFound => {
                         return res.status(200).json({ User: userFound, message: "Profil modifié !"})
                     })
                     .catch(error => res.status(500).json({ error, message: "Impossible de modifié votre profil."}));
                } else {
                    userFound.update({
                        job:  req.body.job,
                        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                     })
                     .then(userFound => {
                         return res.status(200).json({ User: userFound, message: "Profil modifié !"})
                     })
                     .catch(error => res.status(500).json({ error, message: "Impossible de modifié votre profil."}));
                }
            } else {
                if (req.file === undefined || req.file === null) {
                    userFound.update({
                        job:  req.body.job,
                        attachment : null
                     })
                     .then(userFound => {
                         return res.status(200).json({ User: userFound, message: "Profil modifié !"})
                     })
                     .catch(error => res.status(500).json({ error, message: "Impossible de modifié votre profil."}));
                } else {
                    userFound.update({
                        job:  req.body.job,
                        attachment : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                     })
                     .then(userFound => {
                         return res.status(200).json({ User: userFound, message: "Profil modifié !"})
                     })
                     .catch(error => res.status(500).json({ error, message: "Impossible de modifié votre profil."}));
                }
            }
        } else {
            return res.status(400).json({ message: "Utilisateur introuvable."});
        }
    })
    .catch(error => res.status(500).json({ error, message: "Impossible de récupérer l'utilisateur"}));
};

/*exports.deleteUser = (req, res, next) => {
    models.User.findOne({
        where: { id: req.params.id}
    })
    .then((userFoundForDelete) => {
        if (userFoundForDelete) {
            models.Message.findAll({
                where: { UserId: userFoundForDelete.id }
            })
            .then((messagesFound) => {
                if (messagesFound) {
                    console.log(messagesFound);// ok Recupere bien les messages
                    if (messagesFound.attachment === undefined || messagesFound.attachment === null) {
                        models.Message.destroy({
                            where: {UserId: userFoundForDelete.id}
                        })
                        .then(() => {
                            if (userFoundForDelete.attachment === undefined || userFoundForDelete.attachment === null) {
                                userFoundForDelete.destroy({
                                    where: {id: req.params.id}
                                })
                                .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                            } else {
                                const filename = userFoundForDelete.attachment.split('/images/')[1];
                                fs.unlink(`images/${filename}`, () => {
                                    userFoundForDelete.destroy({
                                        email: userFoundForDelete.email
                                    })
                                    .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                    .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                })
                            }
                        })
                        .catch(error => res.status(500).json({ error, message: " Impossible de supprimer l'utilisateur'"}));
                    }else {
                        const filename = messageFound.attachment.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                        models.Message.destroy({
                            where: {UserId: userFoundForDelete.id}
                        })
                        .then(() => {
                            if (userFoundForDelete.attachment === undefined || userFoundForDelete.attachment === null) {
                                userFoundForDelete.destroy({
                                    where: {id: req.params.id}
                                })
                                .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                            } else {
                                const filename = userFoundForDelete.attachment.split('/images/')[1];
                                fs.unlink(`images/${filename}`, () => {
                                    userFoundForDelete.destroy({
                                        email: userFoundForDelete.email
                                    })
                                    .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                    .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                })
                            }
                        })
                        .catch(error => res.status(500).json({ error, message: " Impossible de supprimer l'utilisateur"}));
                        })
                    }
                } else {
                    return res.status(400).json({ message: "Vous ne pouvez pas supprimé l'utilisateur" });
                } 
            })
            .catch(error => res.status(500).json({error, message: "Impossible de récupérer les messages de l'utilisateur, il ne peut être supprimé..."}))
        } else {
            return res.status(400).json({ message: "Vous ne pouvez pas supprimé l'utilisateur" });
        }
    })
    .catch(error => res.status(500).json({error, message: "Impossible de récupérer l'utilisateur, il ne peut être supprimé..."}))
}*/

exports.deleteUser = (req, res, next) => {
    models.User.findOne({
        where: { id: req.params.id}
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findAll({
                where: {UserId: userFound.id}
            })
            .then((messagesFound) => {
               if (messagesFound) {

                models.Comments.findAll({
                    where: {UserId: userFound.id}
                })
                .then((commentsFound) => {
                    if (commentsFound) {
                        let fields = req.query.fields;
                        let order = req.query.order;
                        models.Comments.findAll({
                            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
                            attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
                            where: {MessageId: messagesFound.id}
                        })
                        .then((otherComments) => {
                            models.Comments.destroy({
                                where: {MessageId: messagesFound.id}
                            })
                            .then(() => {
                                models.Comments.destroy({
                                    where: {UserId: userFound.id}
                                })
                                .then(() => {
                                    if (messagesFound.attachment === undefined || messagesFound.attachment === null) {
                                        models.Message.destroy({
                                            where: {UserId: userFound.id}
                                        })
                                        .then(() => {
                                            if (userFound.attachment === undefined || userFound.attachment === null) {
                                                userFound.destroy({
                                                    where: {id: req.params.id}
                                                })
                                                .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                                .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                            } else {
                                                const filename = userFoundForDelete.attachment.split('/images/')[1];
                                                fs.unlink(`images/${filename}`, () => {
                                                    userFound.destroy({
                                                        email: userFound.email
                                                    })
                                                    .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                                    .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                                })
                                            }
                                        })
                                        .catch(error => res.status(500).json({ error, message: " Impossible de supprimer l'utilisateur'"}));
                                    }else {
                                        const filename = messagesFound.attachment.split('/images/')[1];
                                        fs.unlink(`images/${filename}`, () => {
                                        models.Message.destroy({
                                            where: {UserId: userFound.id}
                                        })
                                        .then(() => {
                                            if (userFound.attachment === undefined || userFound.attachment === null) {
                                                userFound.destroy({
                                                    where: {id: req.params.id}
                                                })
                                                .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                                .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                            } else {
                                                const filename = userFound.attachment.split('/images/')[1];
                                                fs.unlink(`images/${filename}`, () => {
                                                    userFound.destroy({
                                                        email: userFound.email
                                                    })
                                                    .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
                                                    .catch(error => res.status(500).json({error, message: "L'utilisateur n'a pas été supprimé."}))
                                                })
                                            }
                                        })
                                        .catch(error => res.status(500).json({ error, message: " Impossible de supprimer l'utilisateur"}));
                                        })
                                    }
                                })
                                .catch(error => res.status(500).json({error, message: "Impossible de supprimer les Commentaires l'utilisateur concerné, il ne peut être supprimé..."}))
                            })
                            .catch(error => res.status(500).json({error, message: "Impossible de supprimer les Commentaires des autres utilisateurs sur les messages de l'utilisateur concerné, il ne peut être supprimé..."}));
                        })
                        .catch(error => res.status(500).json({error, message: "Impossible de récupérer les Commentaires des autres utilisateurs sur les messages de l'utilisateur concerné, il ne peut être supprimé..."}));
                       } else {
                        return res.status(400).json({ message: "Les commentaires de cet utilisateur n'ont pas été récupéré" });
                       }

                   })
                   .catch(error => res.status(500).json({error, message: "Impossible de récupérer les Commentaires de l'utilisateur, il ne peut être supprimé..."}));
               } else {
                return res.status(400).json({ message: "Vous ne pouvez pas supprimé l'utilisateur" });
               }
            })
            .catch(error => res.status(500).json({error, message: "Impossible de récupérer les messages de l'utilisateur, il ne peut être supprimé..."}));
        } else {
            return res.status(400).json({ message: "Vous ne pouvez pas supprimé l'utilisateur" });
        }
    })
    .catch(error => res.status(500).json({error, message: "Impossible de récupérer l'utilisateur, il ne peut être supprimé..."}));
}
