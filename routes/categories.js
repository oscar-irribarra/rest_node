const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategory, postCategory, putCategory, deleteCategory } = require('../controllers/categories');

const router = Router();

const { validateJWT, validateParams, hasRole } = require('../middlewares');
const { isCategoryRegistered } = require('../helpers/db-category.validators');

router.get(
    '/', 
    getCategories
);

router.get(
    '/:id', 
    check('id', 'Id is not valid').isMongoId().custom( isCategoryRegistered ),
    getCategory
);

router.post(
    '/', 
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        validateParams
    ], 
    postCategory
);

router.put(
    '/:id', 
    [
        validateJWT,
        check('id', 'id is not valid').isMongoId().custom( isCategoryRegistered ),
        check('name', 'name is required').not().isEmpty(),
        validateParams
    ],
    putCategory
);

router.delete(
    '/:id', 
    [
        validateJWT,
        hasRole('ADMIN_ROLE'),
        check('id', 'Id is not valid').isMongoId().custom( isCategoryRegistered ),
        validateParams
    ],
    deleteCategory
);


module.exports = router;