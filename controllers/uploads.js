const path = require('path');
const fs = require('fs');

const { response } = require('express');

const { uploadFile } = require('../helpers/upload-file');
const User = require('../models/user');
const Product = require('../models/product');

const uploadFiles = async (req, res = response) => {
  
    try {
        const fileName = await uploadFile( req.files, undefined , 'images');
        res.json({
            name: fileName
        });
        
    } catch (error) {
        
        console.log('uploadFiles():uploads', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}

const updateImage = async ( req, res = response ) => {

    try {

        const { id, colection } = req.params;

        let model;

        switch (colection) {
            case 'users':

                model = await User.findById( id );
                if(!model){
                    return res.status(400).json({
                        msg: 'Id user doenst Exist: '+id
                    });
                }
                
                break;

            case 'products':
                model = await Product.findById( id );
                if(!model){
                    return res.status(400).json({
                        msg: 'Id product doenst Exist: '+id
                    });
                }
                break;
        
            default:
                return res.status(500).json({ msg: 'colection not defined' })
        }
        
            if( model.img ){
                const pathImage = path.join( __dirname, '../uploads/', colection, model.img );

                if( fs.existsSync(pathImage) ){
                    fs.unlinkSync( pathImage );
                }

            }

            const fileName = await uploadFile( req.files, undefined , colection);
            model.img = fileName;
        
            await model.save();
        
            res.json(model);
        
    } catch (error) {

        console.log('updateImage():uploads', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}

const showImage = async (req , res = response) => {
    
    try {

        const { id, colection } = req.params;

        let model;

        switch (colection) {
            case 'users':

                model = await User.findById( id );
                if(!model){
                    return res.status(400).json({
                        msg: 'Id user doenst Exist: '+id
                    });
                }
                
                break;

            case 'products':
                model = await Product.findById( id );
                if(!model){
                    return res.status(400).json({
                        msg: 'Id product doenst Exist: '+id
                    });
                }
                break;
        
            default:
                return res.status(500).json({ msg: 'colection not defined' })
        }

        
            if( model.img ){
                const pathImage = path.join( __dirname, '../uploads/', colection, model.img );

                if( fs.existsSync(pathImage) ){
                    return res.sendFile( pathImage );
                }
            }

            res.sendFile( path.join( __dirname, '../assets/no-image.jpg'));
        
    } catch (error) {

        console.log('showImage():uploads', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}



module.exports = {
    uploadFiles,
    updateImage,
    showImage
}