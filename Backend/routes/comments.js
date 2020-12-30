const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/new/:id', auth, commentCtrl.createComment); // Fonctionne correctement
router.get('/oneComment/:id', auth, commentCtrl.oneComment); // Fonctionne correctement
router.get('/all',  auth, commentCtrl.getAllComments); // Route et controller fonctionne 
router.put('/:id', auth, commentCtrl.modifyComment);     // Route et controller fonctionne
router.delete('/:id', auth, commentCtrl.deleteComment); 

module.exports = router;