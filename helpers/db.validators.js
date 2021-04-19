const availableColections = ( colection = '', colections = [] ) => {

    const include = colections.includes( colection );

    if( !include ){
        throw new Error(`colection ${colection} is no allowed`);
    }

    return true;
}


module.exports = {
    availableColections
}