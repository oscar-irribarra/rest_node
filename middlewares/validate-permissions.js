const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next)=> {

    const user = req.user;

    if ( !user ){
        return res.status(500).json({
            msg: 'cant verify rol withou verify token first'
        });
    }

    const { rol, name } = user;

    if( user.rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `Unauthorized - ${ name } is not an administrator`
        });
    } 
    next();

}

const hasRole = ( ...roles )=>{
    return (req = request, res = response, next) => {

        const user = req.user;

        if( !user ){
            return res.status(500).json({
                msg: 'cant verify rol withou verify token first'
            });
        }

        if( !roles.includes( user.rol ) ){
            return res.status(401).json({
                msg: 'Unauthorized - You dont have a ROL valid'
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}