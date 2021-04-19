const { Router } = require('express');
const { check } = require('express-validator');

const { validateParams, validateUploadFiles } = require('../middlewares');
const { uploadFiles, updateImageCloudinary, showImage } = require('../controllers/uploads');
const { availableColections } = require('../helpers/db.validators');


const router = Router();

router.post('/', validateUploadFiles, uploadFiles );

router.put('/:colection/:id', 
    [
        check('id', 'id is not valid').isMongoId(),
        check('colection').custom( c => availableColections( c, ['users','products'] )),
        validateUploadFiles,
        validateParams
    ],
    updateImageCloudinary
);

router.get('/:colection/:id', 
    [
        check('id', 'id is not valid').isMongoId(),
        check('colection').custom( c => availableColections( c, ['users','products'] )),
        validateParams
    ],
    showImage
);

module.exports = router;