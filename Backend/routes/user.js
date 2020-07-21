const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.limiter, userCtrl.login);
router.put('/user/me', userCtrl.updateProfile);
//router.delete('/delete', auth, userCtrl.deleteUser);
router.get('/user/me', auth, userCtrl.getProfile);

module.exports = router;