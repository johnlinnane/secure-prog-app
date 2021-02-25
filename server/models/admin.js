const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    
    name: String,
    email: String,
    password: String

}, {timestamps:true} );


const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin }