const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');




exports.createMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    let content = req.body.content;

    if (content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    if (content.length <= 4) {
        res.status(400).json({ message: "Votre contenu doit contenir au moins 4 caractères"})
    }
    if (req.file === null || req.file === undefined) {
        models.User.findOne({
            where: {id: userId},
            attributes: ['id', 'firstName', 'lastName', 'job']
        })
        .then((userFound) => {
            if (userFound) {

                models.Message.create({
                    content: content,
                    likes: 0,
                    UserId: userFound.id,
                    attachment: null
                })
                .then((newMessage) => {
                    res.status(201).json({ newMessage, User: userFound });
                })
                .catch(error => res.status(500).json({ error, message: "Impossible de publier votre message." }))
            } else {
                return res.status(400).json({ message: "Utilisateur introuvable, impossible de créer le message." });
            }
        })
        .catch(error => res.status(500).json({ 'error': error, message: "Une erreur est survenue, le message n'est donc pas envoyé" }));
    } else {
        models.User.findOne({
            where: {id: userId},
            attributes: ['id', 'firstName', 'lastName', 'job']
        })
        .then((userFound) => {
            if (userFound) {
    
                models.Message.create({
                    content: content,
                    likes: 0,
                    UserId: userFound.id,
                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                })
                .then((newMessage) => {
                    res.status(201).json({ newMessage, User: userFound });
                })
                .catch(error => res.status(500).json({ error, message: "Impossible de publier votre message." }))
            } else {
                return res.status(400).json({ message: "Utilisateur introuvable, impossible de créer le message." });
            }
        })
        .catch(error => res.status(500).json({ 'error': error, message: "Une erreur est survenue, le message n'est donc pas envoyé" }));
    }
    

};

exports.oneMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job', 'attachment', 'isAdmin'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id},
                attributes: ['content', 'attachment']
            })
            .then((message) => {
                res.status(200).json({message, userFound});
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(404).json({ message: "Aucuns messages trouvés.."});
        }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllMessage = (req, res, next) => { //Affichage de tous les messages
    let fields = req.query.fields;
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName', 'job', 'id', 'attachment']
        }]
    })
    .then((messages) => {
        if (messages) {
            res.status(200).json(messages);
        }else {
            res.status(404).json({ message: "Aucuns messages trouvés.."});
        }
    })
    .catch( error => res.status(500).json({ error }));

};


exports.modifyMessage =(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job', 'isAdmin'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    if (messageFound.UserId === userId || userFound.isAdmin === true) {
                        if (messageFound.attachment === undefined || messageFound.attachment === null) {    
                            if (req.file === null || req.file === undefined) {
                                messageFound.update({                                                                                                             
                                    content: req.body.content,                                                  
                                    attachment: null                                                            
                                })
                                .then(newMessage => {res.status(200).json({ message: "Message modifié !", newMessage})})
                                .catch(error => res.status(500).json({ error, message: " Impossible de modifié le message"}))
                            } else {
                                messageFound.update({
                                    content: req.body.content,
                                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                                })
                                .then(newMessage => {res.status(200).json({ message: "Message modifié !", newMessage})})
                                .catch(error => res.status(500).json({ error, message: " Impossible de modifié le message"}))
                            }
                        } else {
                            if (req.file === null || req.file === undefined) {
                                messageFound.update({                                                                                                              
                                    content: req.body.content,                                                  
                                    attachment: null                                                            
                                })
                                .then(newMessage => {res.status(200).json({ message: "Message modifié !", newMessage})})
                                .catch(error => res.status(500).json({ error, message: " Impossible de modifier le message"}))
                            } else {
                                messageFound.update({
                                    content: req.body.content,
                                    attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                                })
                                .then(newMessage => {res.status(200).json({ message: "Message modifié !", newMessage})})
                                .catch(error => res.status(500).json({ error, message: " Impossible de modifier le message"}))
                            }    
                          }
                    } else {
                      return res.status(403).json({ message: " Vous ne pouvez pas modifier le message"});
                    }
                } else {
                    return res.status(400).json({ message: "Impossible de modifier le message"});
                }
            })
            .catch(error => res.status(500).json({ error, message: "Message introuvable"}));
        } else {
            return res.status(400).json({ message: "Utilisateur introuvable !"});
        }
    })
    .catch(error => res.status(500).json({ error }));
};
exports.deleteMessage = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job', 'isAdmin'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    if (messageFound.UserId === userId || userFound.isAdmin === true) {
                        if (messageFound.attachment === undefined || messageFound.attachment === null) {
                            models.Message.destroy({
                                where: {id: req.params.id}
                            })
                            .then(res.status(200).json({ message: "Message supprimé !"}))
                            .catch(error => res.status(500).json({ error, message: " Impossible de supprimer le message"}));
                        }else {
                            const filename = messageFound.attachment.split('/images/')[1];
                            fs.unlink(`images/${filename}`, () => {
                            models.Message.destroy({
                                where: {id: req.params.id}
                            })
                            .then(res.status(200).json({ message: "Message supprimé !"}))
                            .catch(error => res.status(500).json({ error, message: " Impossible de supprimer le message"}));
                        })
                        }
                    } else {
                        res.status(403).json({ message: " Vous ne pouvez pas supprimer le message"});
                    }
                } else {
                    return res.status(400).json({ message: "Impossible de supprimer le message"});
                }
            })
            .catch(error => res.status(500).json({ error, message: "Message introuvable"}));
        } else {
            return res.status(400).json({ message: "Utilisateur introuvable !"});
        }
    })
    .catch(error => res.status(500).json({ error }));
};