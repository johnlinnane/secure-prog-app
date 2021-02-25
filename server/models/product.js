const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    
    product_name: String,
    price: Number,
    description: Boolean

}, {timestamps:true} );


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }