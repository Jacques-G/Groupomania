const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.id && req.body.id !== userId) {
            throw 'Invalid user ID !'
        } else {
            next();
        }
    } catch {
        res.status(401).json({ 
            error : new Error('Invalid request !')
        });
    }
    /*const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if(userId !== req.body.id) {
        return res.status(400).json({ error })
    } else {
        next();
    }*/
};
