const { response } = require('express');

const Product = require('../models/product');

const isProductRegistered = async ( id = '' ) => {

    try {

        const product = await Product.findById( id );

        if( !product ){
            throw new Error(`ID ${ id } doens´t exist`);
        }
        
    } catch (error) {
        
        console.log('isproductRegistered():db-product.validators', error);

        throw new Error('Contact with administrator');

    }

};

module.exports = {
    isProductRegistered
}