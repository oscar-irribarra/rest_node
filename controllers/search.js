const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Category = require('../models/category');
const User = require('../models/user');
const Product = require('../models/product');

const colectionsAllowed = [
    'users',
    'categories',
    'products',
    'rol'
];

const searchUsers = async ( term = '', res = response ) => {

    try {
        const isMongoId = ObjectId.isValid( term );
    
        if( isMongoId ){
            const user = await User.findById( term );
            return res.json({ results: user ? [ user ] : [] });
        }
            
        const regexp = new RegExp( term, 'i' );
    
        const users = await User.find( { 
            $or: [{name: regexp},{email: regexp}],
            $and: [{status: false}]
         });
    
        res.json({ results: users });
    } catch (error) {
        console.log('searchUsers():search', error);   

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}

const searchCategories = async ( term = '', res = response ) => {

    try {
        const isMongoId = ObjectId.isValid( term );
    
        if( isMongoId ){
            const category = await Category.findById( term );
            return res.json({ results: category ? [ category ] : [] });
        }
            
        const regexp = new RegExp( term, 'i' );
    
        const categories = await Category.find( { name: regexp, state: true });
    
        res.json({ results: categories });        
    } catch (error) {
        console.log('searchCategories():search', error);   

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}

const searchProducts = async ( term = '', res = response ) => {

    try {
        const isMongoId = ObjectId.isValid( term );
    
        if( isMongoId ){
            const product = await Product.findById( term ).populate('category','name');
            return res.json({ results: product ? [ product ] : [] });
        }
            
        const regexp = new RegExp( term, 'i' );
    
        const products = await Product.find( { name: regexp }).populate('category','name');
    
        res.json({ results: products });        
    } catch (error) {
        console.log('searchProducts():search', error);   

        res.status(500).json({
            msg: 'Contact with Administrator'
        });
    }
}


const search = ( req, res = response ) => {

    const { colection, term } = req.params;

    if( !colectionsAllowed.includes(colection) ){
        return res.status(400).json({
            msg: `Only can search the following colections ${ colectionsAllowed }`
        })
    }

    switch ( colection ) {
        case 'users':
            searchUsers( term, res );
            break;
        case 'categories':
            searchCategories( term, res );
            break;
        case 'products':
            searchProducts( term, res );
            break;  
        default:
            res.status(500).json({
                msg: 'search is not allowed'
            });
        break;
    }
}



module.exports = {
    search
}