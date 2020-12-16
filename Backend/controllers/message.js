const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');




exports.createMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    let title = req.body.title;
    let content = req.body.content;
    //let attachment =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    if (title === null || content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    if (title.length <= 2 || content.length <= 4) {
        res.status(400).json({ message: "Votre titre doit contenir au moins 2 caractères et votre contenu 4"})
    }
    if (req.file === null || req.file === undefined) {
        models.User.findOne({
            where: {id: userId},
            attributes: ['id', 'firstName', 'lastName', 'job']
        })
        .then((userFound) => {
            if (userFound) {

                models.Message.create({
                    title: title,
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
                    title: title,
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


exports.getAllMessage = (req, res, next) => { //Affichage de tous les messages
    let fields = req.query.fields;
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName', 'job', 'id']
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
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    if (messageFound.UserId === userId || userFound.isAdmin === 1) {
    
                        messageFound.update({
                            title: req.body.title,
                            content: req.body.content,
                            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                        })
                        .then(newMessage => {res.status(200).json({ message: "Message modifié !", newMessage})})
                        .catch(error => res.status(500).json({ error, message: " Impossible de modifié le message"}))
                    } else {
                      return res.status(403).json({ message: " Vous ne pouvez pas supprimer le message"});
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
}
exports.deleteMessage = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    if (messageFound.UserId === userId || userFound.isAdmin === 1) {
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
/*exports.deleteMessage = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: { id: userId }
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    if (messageFound.UserId === userId || userFound.isAdmin === 1) {
                        const filename = messageFound.attachment.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            models.Message.destroy({
                            where: {id: req.params.id}
                            })
                            .then(res.status(200).json({ message: "Message supprimé !"}))
                            .catch(error => res.status(500).json({ error, message: " Impossible de supprimer le message"}));
                        })
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
};*/


exports.likeOrNot = (req, res, next) => {

    if (req.body.like === 1) { // Si l'utilisateur Aime le Message
        models.Message.update({
            likes: req.body.likes++
        }, {$push: { userliked: req.body.UserId}}, {
            where: {id: req.params.id}
        })
        .then(() => res.status(200).json({ message: "Vous aimez ce Message"}))
        .catch( error => res.status(500).json({ error, message: "Une erreur est survenue, le j'aime n'a pas été enregistré."}));
    } else {
        models.Message.find({
            where: {id: req.params.id}
        })
        .then(MessageFound => {
            if(MessageFound.userliked.include(req.body.userId)) {
                models.Message.update({
                    likes: -1
                }, {$pull: { userliked: req.params.userId}})
                .then(() => res.status(201).json({ message: "Un like de moins"}))
                .catch( error => res.status(500).json({ error}));
            } else {
                return res.status(500).json({ message: "Une erreur est survenue, impossible de vérifier les j'aimes.."});
            }
        })
        .catch(error => res.status(500).json({ error }));
    }
};