const { Router } = require('express');
const { check } = require('express-validator');
const { postProduct, getProducts, getProduct, putProduct, deleteProduct } = require('../controllers/products');

const router = Router();

const { validateJWT, validateParams, isAdminRole } = require('../middlewares');
const { isCategoryRegistered } = require('../helpers/db-category.validators');
const { isProductRegistered } = require('../helpers/db-product.validators');

router.get(
    '/', 
    getProducts
);
    
router.get(
    '/:id',
    [
        check('id', 'id is not valid').isMongoId().custom( isProductRegistered ),
        validateParams
    ],
    getProduct
)

router.post(
    '/',
    [
        validateJWT,
        check('name', 'name is required').not().isEmpty(),
        check('category', 'category is required').not().isEmpty().isMongoId().custom( isCategoryRegistered ),
        check('description', 'description is required').optional().not().isEmpty(),
        check('price', 'name is required').optional().isNumeric(),
        check('available', 'name is required').optional().isBoolean(),
        validateParams
    ],
    postProduct
);

router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'id is not valid').isMongoId().custom( isProductRegistered ),
        check('name', 'name is required').not().isEmpty(),
        check('category', 'category is required').not().isEmpty().isMongoId().custom( isCategoryRegistered ),
        check('description', 'description is required').optional().not().isEmpty(),
        check('price', 'name is required').optional().isNumeric(),
        check('available', 'name is required').optional().isBoolean(),
        validateParams
    ],
    putProduct
)

router.delete(
    '/',
    [
        validateJWT,
        isAdminRole,
        check('id', 'id is not valid').isMongoId().custom( isProductRegistered ),
        validateParams
    ],
    deleteProduct
)

module.exports = router;