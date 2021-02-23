const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };
        const secretKey =  process.env.SECRETORPRIVATEKEY;

        jwt.sign( payload, secretKey, { expiresIn: '1h' }, ( err, token ) =>{
            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }
        });

    }); 
}

module.exports = generateJWT;