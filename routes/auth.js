const { Router } = require('express');
const { check } = require('express-validator');

const { validateParams } = require('../middlewares/validate-params');

const { authPost } = require('../controllers/auth');

const router = Router();

router.post(
    '/login', 
    [
        check('email', 'Email is required').isEmail().notEmpty(),
        check('password', 'Password is required').notEmpty(),
        validateParams
    ], 
    authPost
);

module.exports = router;