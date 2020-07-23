const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


const messageCtrl = require('../controllers/message');

router.post('/new', messageCtrl.createMessage);
router.get('/all',  messageCtrl.getAllMessage);
router.delete('/delete', messageCtrl.deleteMessage);

module.exports = router;