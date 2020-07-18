const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.limiter, userCtrl.login);
//router.put('/:id', userCtrl.modifyUser);
//router.delete('/:id', userCtrl.deleteUser);
//router.get('/:id', userCtrl.getOneUser);

module.exports = router;