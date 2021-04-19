const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtension = ['png','jpg','jpeg','gif'], folder = '' ) => {

    return new Promise ((resolve, reject)=>{

        const { file } = files;
    
        const name = file.name.split('.');
        const extension = name[ name.length - 1 ];
    
        // validar extension
        if( !validExtension.includes(extension) ){
            return reject(`file extension ${extension} is not valid`);
        }
    
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName);
    
        file.mv(uploadPath, (err) => {
    
            if(err){
                return reject(err);
            }
    
            resolve(tempName);
        });
    });

}

module.exports = {
    uploadFile
}