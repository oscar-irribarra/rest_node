const { response } = require('express');
const Product = require('../models/product');

const getProducts = async ( req, res = response ) => {

    const { limit= 5, from= 0 } = req.query;

    const [ total, products ] = await Promise.all([

        Product.countDocuments( { state: true } ),
        Product.find({ state: true })
            .populate('category', 'name')
            .populate('user', 'name')
            .limit( Number( limit ) )
            .skip( Number( from ) )

    ]).catch( error => {

        console.log('getProducts():products', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });

    });

    res.json({
        total,
        products
    });
};

const getProduct = async ( req, res = response ) => {

    try {

        const id = req.params.id;

        const product = await Product.findById( id )
                .populate('category', 'name')
                .populate('user', 'name');

        if( !product ){
            return res.status(404).json({
                msg: 'Product with current id doenst exist'
            });
        }

        res.json( product );
        
    } catch (error) {
        
        console.log('getProduct():products', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });

    }

};

const postProduct = async ( req, res = response ) => {

    try {
        const { state, user, ...data } = req.body;

        const productDb = await Product.findOne( { name: data.name.toUpperCase() } );

        if( productDb ){
            return res.status(400).json({
                msg: 'Product already exist'
            });
        }

        data.user = req.user._id;
        data.name = data.name.toUpperCase();
    
        const product = new Product( data );
    
        product.save();

        res.status(201).json( product );

    } catch (error) {

        console.log('postProduct():products', error );
        
        res.status(500).json({
            msg: 'Contact with Administrator'
        });

    }

};

const putProduct = async ( req, res= response ) => {

    try {

        const id = req.params.id;
        const { state, user, ...data } = req.body;

        data.user = req.user._id;
        if( data.name ){
            data.name = data.name.toUpperCase();
        }

        const product = await Product.findByIdAndUpdate( id, data, { new: true } );

        res.json( product );
        
    } catch (error) {

        console.log('putProduct():products', error);

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }

};

const deleteProduct = async ( req, res = response ) => {

    try {
        const id = req.params.id;

        const product = await Product.findByIdAndUpdate( id, { state: false }, { new: true } );

        res.json( product );
        
    } catch (error) {

        console.log('deleteProduct():products', error);

        return res.status(500).json({
            msg: 'Contact with Administrator'
        });

    }

};

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}