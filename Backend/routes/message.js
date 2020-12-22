const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messageCtrl = require('../controllers/message');

router.post('/new', auth, multer, messageCtrl.createMessage); // Route et controller fonctionne.
router.get('/oneMessage/:id', auth, messageCtrl.oneMessage);
router.get('/all',  auth, messageCtrl.getAllMessage);   // Route et controller fonctionne.
router.put('/:id', auth, multer, messageCtrl.modifyMessage);    // Route et controller Fonctionne apres correction body --> params
router.delete('/:id', auth, messageCtrl.deleteMessage); // Route et controller fonctionne

module.exports = router;
