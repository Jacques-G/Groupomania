const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


const messageCtrl = require('../controllers/message');

router.post('/new', auth, messageCtrl.createMessage);
router.get('/all',  auth, messageCtrl.getAllMessage);
router.put('/:id', auth, messageCtrl.modifyMessage);
router.delete('/delete', auth, messageCtrl.deleteMessage);

module.exports = router;