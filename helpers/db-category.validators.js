const Category = require('../models/category');


const isCategoryRegistered = async ( id = '' ) => {

    try {
        const categoryDB = await Category.findById( id );
        if( !categoryDB ){
            throw new Error(`ID ${ id } doens´t exist`)
        }
    } catch (error) {
        console.log('isCategoryRegistered(): db-category.Validators', error);
        throw new Error('Contact with Administrator');        
    }
};


module.exports = {
    isCategoryRegistered
}


