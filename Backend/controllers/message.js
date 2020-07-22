const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createMessage = (req, res, next) => {

    let title = req.body.title;
    let content = req.body.content
    

    if(title === null || content === null) {
        res.status(400).json({ message: "Veuillez remplir tous les champs !"})
    }
    if(title.length <= 2 || content.length <= 4) {
        res.status(400).json({ message: "Votre titre doit contenir au moins 2 characteres et votre contenu 4"})
    }
    /*models.Message.create({
        title: title,
        content: content,
        likes: 0,
        idUsers: User.id
    })
    .then(() => res.status(201).json({ Message }))
    .catch(error => res.status(400).json({ error }));*/
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
                idUsers: userFound.id
            })
            .then((newMessage) => {
                res.status(201).json({ newMessage })
            })
            .catch(error => res.status(400).json({ error }));
        }
        return res.status(400).json({ message: "Message non envoyé" })
    })
    .catch(res.status(400).json({ message: "Utilisateur introuvable"}))
};

exports.getAllMessage = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNan(limit)) ? limit: null,
        offset: (!isNan(offset)) ? offset: null,
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

};

exports.deleteMessage = (req, res, next) => {
    
};