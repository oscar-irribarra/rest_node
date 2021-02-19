const { Router } = require('express');
const {
  userGet,
  userPost,
  userDelete,
  userPut,
} = require('../controllers/users');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.delete('/', userDelete);

module.exports = router;
