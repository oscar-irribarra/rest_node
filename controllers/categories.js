const { response  } = require('express');
const Category = require('../models/category');

const getCategories = async ( req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    const [ total, categories ] = await Promise.all([

        Category.countDocuments({ state: true }),
        Category.find({ state: true }).populate('user', 'name')

    ]).catch(err =>{
        console.log('getCategories():categories', error);

        res.status(500).json({
            ok: false,
            msg: 'Contact with Administrator'
        })
    })

    res.json({
        ok: true,
        categories
    })
}

const getCategory = async ( req, res = response) => {

    try {

        const id = req.params.id;

        const categoryDb = await Category.findById( id ).populate('user', 'name');

        if( !categoryDb ){
            return res.status(404).json({
                ok: false,
                msg: 'Category with current id doenst exist'
            });
        }

        res.json({
            ok: true,
            categoryDb
        })

        
    } catch (error) {
        console.log('getCategory():categories', error);

        return res.status(500).json({
            ok: false,
            msg: 'Contact with Administrator'
        });
    }

}

const postCategory = async ( req, res = response ) => {
    
    const name = req.body.name.toUpperCase();
    
    try {  
        
        const categoryDb = await Category.findOne({ name });

        if( categoryDb ){
            return res.status(400).json({
                msg: 'Category already exist'
            });
        }
    
        const data = {
            name,
            user: req.user._id
        }
    
        const category = new Category( data );
    
        await category.save();

        res.status(201).json( category );

    } catch (error) {

        console.log('categoryPost():categories', error);
    
        return res.status(500).json({ 
          ok: false, 
          msg: 'Contact with the Administrator' 
        });

    }

};

const putCategory = async ( req, res = response ) => {
    
    try {
        const id = req.params.id;
        const name = req.body.name.toUpperCase();
        const user = req.user._id;

        const categoryDb = await Category.findByIdAndUpdate( id, { name, user }, { new: true });

        res.json({ ok:true, categoryDb });
        
    } catch (error) {
        
        console.log('putCategory():categories', error);

        return res.status(500).json({
            ok: false,
            msg: 'Contact with Administrator'
        });
    }

};

const deleteCategory = async ( req, res = response ) => {

    try {
        const id = req.params.id;

        const categoryDb = await Category.findByIdAndUpdate( id, { state: false }, { new: true }); 

        res.json({
            ok: true,
            categoryDb
        });
        
    } catch (error) {
        console.log('deleteCategory():categories', error);
        
        return res.status(500).json({
            ok:false,
            msg: 'contact with administrator'
        })
    }

};

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}