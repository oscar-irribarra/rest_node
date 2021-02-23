

const Params = require('../middlewares/validate-params');
const JWT = require('../middlewares/validate-jwt');
const Permissions = require('../middlewares/validate-permissions');


module.exports = {
    ...Params,
    ...JWT,
    ...Permissions,
}