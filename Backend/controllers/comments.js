const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    let content = req.body.content;

    if (content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    models.User.findOne({
        where: {id: userId},
        attributes: ['id', 'attachment']
    })
    .then((userFound) => {
        if (userFound) {
            models.Message.findOne({
                where: {id: req.params.id}
            })
            .then((messageFound) => {
                if (messageFound) {
                    models.Comments.create({
                        content: content,
                        MessageId: messageFound.id,
                        UserId: userFound.id
                    })
                    .then((newComment) => {
                        res.status(200).json({newComment});
                    })
                    .catch(error => res.status(500).json({ error, message: "Impossible de publier votre commentaire." }))
                } else {
                    return res.status(400).json({message: "Impossible de récupérer le message d'origine"});
                }
            })
            .catch(error => res.status(500).json({error, message:'Une erreur est survenue...'}));
        } else {
            return res.status(400).json({ message: "Utilisateur introuvable, impossible de créer le commentaire." });
        }
    })
    .catch(error => res.status(500).json({ 'error': error, message: "Une erreur est survenue, le commentaire n'est donc pas envoyé" }));
};

exports.oneComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    models.User.findOne({
        where: {id: userId},
        attributes: ['id', 'firstName', 'lastName', 'job', 'attachment', 'isAdmin']
    })
    .then((userFound) => {
        if (userFound) {
            models.Comments.findOne({
                where: {id: req.params.id}
            })
            .then((comment) => {
                res.status(200).json({comment, userFound});
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(404).json({ message: "Aucuns commentaires trouvés.."});
        }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {
    let fields = req.query.fields;
    let order = req.query.order;
    
    models.Comments.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName', 'id', 'attachment']
        }]
    })
    .then((allComments) => {
        if (allComments) {
            res.status(200).json(allComments)
        } else {
            res.status(404).json({ message: "Aucuns commentaire trouvés.."});
        }        
    })
    .catch(error => res.status(500).json({error}))
};

exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job', 'isAdmin'],
        where: { id: userId }
    })
    .then((userFound) => {
        console.log(userFound);
        if (userFound) {
            models.Comments.findOne({
                where: {id: req.params.id}
            })
            .then((commentFound) => {
                if (commentFound) {
                    if (commentFound.UserId === userId || userFound.isAdmin === true) {
                        commentFound.update({
                            content: req.body.content
                        })
                        .then((newComment) => {
                            res.status(200).json({message: 'Commentaire modifié', newComment})
                        })
                        .catch(error => res.status(500).json({ error, message: " Impossible de modifier le commentaire"}))
                    }
                } else {
                    return res.status(403).json({ message: " Nous n'avons reussi à récupérer le commentaire..."});
                }
            })
            .catch(error => res.status(500).json({ error, message: "Commentaire introuvable"}))
        } else {
            return res.status(400).json({ message: "Utilisateur introuvable !"});
        }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'job', 'isAdmin'],
        where: { id: userId }
    })
    .then((userFound) => {
        models.Comments.findOne({
            where: {id: req.params.id}
        })
        .then((commentFound) => {
            if (commentFound) {
                if (commentFound.UserId === userId || userFound.isAdmin === true) {
                    models.Comments.destroy({
                        where: {id: req.params.id}
                    })
                    .then(res.status(200).json({ message: "Commentaire supprimé !"}))
                    .catch(error => res.status(500).json({ error, message: " Impossible de supprimer le commentaire"}));
                } else {
                    res.status(403).json({ message: " Vous ne pouvez pas supprimer le commentaire"});
                }
            } else {
                return res.status(400).json({ message: "Impossible de supprimer le commentaire"});
            }
        })
        .catch(error => res.status(500).json({ error, message: "Commentaire introuvable"}))
    })
    .catch(error => res.status(500).json({ error }))
};
