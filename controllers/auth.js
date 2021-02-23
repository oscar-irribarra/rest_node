const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { validate } = require('../models/user');
const generateJWT = require('../helpers/generate-jwt');

const authPost = async (req = request, res = response) => {
    
    const { email, password } = req.body;
    
    try {
        // Veficar Correo Existe
        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                ok: true,
                msg: 'User or Password not valid - email'
            });
        }

        // Validar estado activo
        if( !user.state ){
            return res.status(400).json({
                ok: true,
                msg: 'User or Password not valid - state'
            });
        }

        // Verificar Contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: true,
                msg: 'User or Password not valid - password'
            });
        }

        // GenerarToken
        const token = await generateJWT( user.id );
        res.json({ 
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log('authPost():auth', error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Contact with the Administrator' 
        });
    }


};


module.exports = {
    authPost
}