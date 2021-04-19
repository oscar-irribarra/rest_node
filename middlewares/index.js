

const Params = require('../middlewares/validate-params');
const JWT = require('../middlewares/validate-jwt');
const Permissions = require('../middlewares/validate-permissions');
const validateUploadFiles = require('../middlewares/validate-files');


module.exports = {
    ...Params,
    ...JWT,
    ...Permissions,
    ...validateUploadFiles
}