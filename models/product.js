const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        require: [ true, 'name is required'],
        unique: true        
    },
    state: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, state, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductSchema );