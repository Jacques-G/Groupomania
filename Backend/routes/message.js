const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const messageCtrl = require('../controllers/message');

router.get('/:id', auth, messageCtrl.getOneMessage);
router.post('/new', auth, multer, messageCtrl.createMessage); // Route et controller fonctionne.
router.get('/all',  auth, messageCtrl.getAllMessage);   // Route et controller fonctionne.
router.put('/:id', auth, multer, messageCtrl.modifyMessage);    // Route et controller Fonctionne apres correction body --> params
router.delete('/:id', auth, messageCtrl.deleteMessage); // Route et controller fonctionne
router.post('/:id/like', auth, messageCtrl.likeOrNot);  // A voir, si je garde

module.exports = router;