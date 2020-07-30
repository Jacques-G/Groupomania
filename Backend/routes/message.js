const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const messageCtrl = require('../controllers/message');

router.post('/new', auth, messageCtrl.createMessage);   //  Route et controller fonctionne. Modif de la partie 'attachment' mais les images ne sont pas enregistrer dans le dossier..
router.get('/all',  auth, messageCtrl.getAllMessage);   // Route et controller fonctionne.
router.put('/:id', auth, messageCtrl.modifyMessage);    // Route et controller Fonctionne apres correction body --> params
router.delete('/:id', auth, messageCtrl.deleteMessage); // Route ok. Controller me supprime bien le message de la bdd mais m'affiche une erreur
router.post('/:id/like', auth, messageCtrl.likeOrNot);  // A voir, si je garde

module.exports = router;