const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);                    // Routes et controller OK
router.post('/login', userCtrl.limiter, userCtrl.login);    // Route et controller ok
router.put('/user/:id', auth, userCtrl.updateProfil);       //Route ok controller ok mais me renvoi tout de même une erreur
router.delete('/user/:id', auth, userCtrl.deleteUser);      // Route et controller ok
router.get('/user/:id', auth, userCtrl.getProfile);         // Route et controller ok

// Toutes les routes fonctionnent mais bien qu'elle fonctionne la route put m'affiche une erreur //
module.exports = router;