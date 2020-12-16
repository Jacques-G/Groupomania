const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');



router.post('/signup', userCtrl.signup);                    // Routes et controller OK
router.post('/login', userCtrl.limiter, userCtrl.login);    // Route et controller ok
router.put('/user/:id', auth, multer, userCtrl.updateProfil);       // Route ok controller ok 
router.delete('/user/:id', auth, userCtrl.deleteUser);      // Route et controller ok
router.get('/user/:id', auth, userCtrl.getProfile);         // Route et controller ok


module.exports = router;