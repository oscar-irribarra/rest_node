
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    try {

        const token = req.header('x-token');
        const secretKey = process.env.SECRETORPRIVATEKEY;

        if( !token ){
            return res.status( 401 ).json({
                msg: 'token not found'
            });
        }

        const { uid } = jwt.verify( token, secretKey );

        const user = await User.findById( uid );

        // Validar si el usuario existe en la BD
        if( !user ){
            return res.status(401).json({
                msg: 'token not valid - user not found'
            });
        }

        // Validar si el usuario tiene el estado activo
        if( !user.state ){
            return res.status(401).json({
                msg: 'token not valid - user is not active'
            });
        }

        req.user = user;
        
        next();

    } catch (error) {
        
        console.log('validateJWT():validate-jwt', error );
        return res.status( 401 ).json({
            msg: 'token not valid'
        });
    }

}


module.exports = { 
    validateJWT 
};