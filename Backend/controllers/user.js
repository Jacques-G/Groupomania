const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken'); // Token de protection
const bcrypt = require('bcrypt'); // Protection du mot de passe utilisateur


exports.limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 2
});

exports.signup = (req, res, next) => {
   
};