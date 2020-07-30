const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.createMessage = (req, res, next) => { //Creation d'un message 

    let title = req.body.title;
    let content = req.body.content
    let attachment =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    

    if (title === null || content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    if (title.length <= 2 || content.length <= 4) {
        res.status(400).json({ message: "Votre titre doit contenir au moins 2 caractères et votre contenu 4"})
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: {id: userId}
    })
    .then(function(userFound) { 
        if(userFound) {
            let userliked = [] ;
            let like = 0; 

            models.Message.create({
                title: title,
                content: content,
                attachment: attachment,
                likes: 0,
                UserId: userId,
            })
            .then((newMessage) => {
                res.status(201).json({ newMessage, userFound })
            })
            .catch(error => res.status(400).json({ error }));
        }else {
            return res.status(500).json({ message: "L'utilisateur n'a pas été trouvé, le message n'est donc pas envoyé" });
        }
        
    })
    .catch(error => res.statsu(500).json({ error }));
};

exports.getAllMessage = (req, res, next) => { //Affichage de tous les messages
    let fields = req.query.fields;
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName', 'job']
        }]
    })
    .then(function(messages) {
        if (messages) {
            res.status(200).json(messages);
        }else {
            res.status(404).json({ message: "Aucuns messages trouvés.."});
        }
    })
    .catch( error => res.status(500).json({ error }));

};

exports.modifyMessage = (req, res, next) => { //Modification d'un Message

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: {id: userId}
    })
    .then(function(userFound) {
        if (userFound && userFound.id === userId) {
            models.Message.update({
                content: req.body.content,
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            },
            {where: {id: req.body.id}})
            .then(res.status(200).json({ message: "Message Modifié !"}))
            .catch(res.status(500).json({ message: "Impossible de modifier ce message."}));
        }else {
            return res.status(400).json({ message: "Erreur interne, vous ne pouvez modifier ce message."});
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
    .then(function(userFound) {
        if (userFound) {
            if (userFound.id === userId || userFound.isAdmin === 1) { //Vérification des droits pour le faire.
                models.Message.findOne({
                    where: { id: req.params.id}
                })
                .then(function(messageFound) {
                    if (messageFound && userId === messageFound.UserId) {
                        const filename = Message.attachment.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            
                            models.Message.destroy({
                                where: {id: req.params.id}
                            })
                            .then(res.status(200).json({ message : "Message Supprimé !"}))
                            .catch(res .status(500).json({ message : "Impossible de supprimer ce message" }));
                        })
                    } else {
                        return res.status(400).json({ message: "Il est impossible de récupérer le message."})
                    }
                })
                .catch(res.status(500).json({message: "Impossible de récupérer le message désiré, impossible de le supprimer."}));

            }else if (userFound.id !== userId) {
                return res.status(400).json({ message : "Vous n'avez pas les droits pour supprimer ce message."});

            }else {
                return res.status(400).json({ message: "Vous ne pouvez supprimer ce message."});
            }

        }else {
            return res.status(400).json({ message: "L'utilisateur n'a pas été trouvé, il est donc impossible de supprimer le message."});
        }
    })
    .catch(error => res.status(500).json({ error }));
};
/*
exports.deleteMessage = (req, res, next) => { //Suppression d'un Message

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job'],
        where: {id: userId}
    })
    .then(function(userFound) {
        if(userFound) {
            if(userFound.id === userId || User.isAdmin === 1) { //Vérification des droits pour le faire.
                const filename = Message.attachment.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    
                    models.Message.destroy({
                        where: {id: req.params.id}
                    })
                    .then(res.status(200).json({ message : "Message Supprimé !"}))
                    .catch(res .status(500).json({ message : "Impossible de supprimer ce message" }));
                })
            }else if (userFound.id !== userId) {
                return res.status(400).json({ message: "Vous ne pouvez pas supprimer ce message" });
            }else {
                return res.status(400).json({ message: "Vous ne pouvez pas supprimer ce message" });
            }
            
        }else {
            return res.status(400).json({ message: "Impossible de supprimer ce message" });
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