const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { validate } = require('../models/user');
const generateJWT = require('../helpers/generate-jwt');

const { googleVeriy } = require('../helpers/google-verify');

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

const googleSignIn = async ( req = request, res = response ) => {

    const { id_token } = req.body;
    
    try {

        const { email, img, name } = await googleVeriy( id_token );

        let user = await User.findOne({ email });

        if( !user ){
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };

            user = new User( data );
            await user.save();

        }

        if( !user.state ){
            return res.status(401).json({
                msg: 'Account Locked - Contact with the administrator'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            msg: 'ok signIn',
            token,
            user
        });

    } catch (error) {
        console.log('googleSignIn():auth', error)
        res.status(400).json({
            msg: 'Token not valid'
        });
    }

}


module.exports = {
    authPost,
    googleSignIn
}