const { Router } = require('express');
const { check, query } = require('express-validator');

const { validateParams, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const { 
  isRoleValid, 
  isEmailRegistered, 
  isUserRegistered } = require('../helpers/db-user.validators');

const {
  userGet,
  userPost,
  userDelete,
  userPut } = require('../controllers/users');

const router = Router();


router.get(
  '/', 
  [
    query('limit', 'Limit is not valid').optional().isNumeric(),
    query('from', 'From is not valid').optional().isNumeric(),
    validateParams
  ], 
  userGet
);


router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail().custom( isEmailRegistered ),
    check('password', 'Password is required with minimun 6 caracteres').isLength({ min: 6 }),
    check('rol').custom( isRoleValid ),
    validateParams,
  ], 
  userPost
);


router.put(
  '/:id', 
  [
    check('id', 'ID is not valid').isMongoId().custom( isUserRegistered ),
    validateParams
  ], 
  userPut
);


router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('USER_ROLE','ADMIN_ROLE'),
    check('id', 'ID is not valid').isMongoId().custom( isUserRegistered ),
    validateParams
  ], 
  userDelete
);


module.exports = router;
