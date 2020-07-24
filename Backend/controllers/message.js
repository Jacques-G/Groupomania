const models = require('../models');
const jwt = require('jsonwebtoken');
const message = require('../models/message');

exports.createMessage = (req, res, next) => {

    let title = req.body.title;
    let content = req.body.content
    

    if(title === null || content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    if(title.length <= 2 || content.length <= 4) {
        res.status(400).json({ message: "Votre titre doit contenir au moins 2 characteres et votre contenu 4"})
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'poste'],
        where: {id: userId}
    })
    .then(function(userFound) { 
        if(userFound) {
            models.Message.create({
                title: title,
                content: content,
                likes: 0,
                UserId: userId,
            })
            .then((newMessage) => {
                res.status(201).json({ newMessage, userFound })
            })
            .catch(error => res.status(400).json({ error }));
        }else {
            return res.status(400).json({ message: "Message non envoyé" })
        }
        
    })
    //.catch(res.status(400).json({ message: "Utilisateur introuvable"}))
    .catch(error => res.statsu(400).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        //limit: (!isNan(limit)) ? limit: 15,
        //offset: (!isNan(offset)) ? offset: null,
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }]
    })
    .then(function(messages) {
        if(messages) {
            res.status(200).json(messages)
        }else {
            res.status(404).json({ message: "Aucun messages trouvés.."})
        }
    })
    .catch( error => res.status(500).json({ error }))

};

exports.modifyMessage = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'poste'],
        where: {id: userId}
    })
    .then(function(userFound) {
        if(userFound && userFound.id === userId) {
            models.Message.update({
                content: req.body.content,
                attachment: req.body.attachment
            },
            {where: {id: req.body.id}})
            .then(res.status(201).json({ message: "Message Modifié !"}))
            .catch(res.status(400).json({ message: "Impossible de modifier ce message."}))
        }else {
            return res.status(400).json({ message: "Vous ne pouvez modifier ce message."})
        }

    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {

    let messageId = req.body.id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'poste'],
        where: {id: userId}
    })
    .then(function(userFound) {
        if(userFound) {
            if(userFound.id === userId || User.isAdmin === 1) {
                models.Message.destroy({
                    where: {id: messageId}
                })
                .then(res.status(201).json({ message : "Message Supprimé !"}))
            }else if(userFound.id !== userId) {
                return res.status(400).json({ message: "Vous ne pouvez pas supprimer ce message" })
            }else {
                return res.status(400).json({ message: "Vous ne pouvez pas supprimer ce message" })
            }
            
        }else {
            return res.status(400).json({ message: "Impossible de supprimer ce message" })
        }
    })
    .catch(error => res.status(400).json({ error }))
};

exports.likeOrNot = (req, res, next) => {
    let userliked = [] ;
    let likes = 0; 

    if(req.body.likes === 1) {
        models.Message.update({
            likes: req.body.likes++
        }, {
            where: {id: req.params.id}
        })
        
    }
};