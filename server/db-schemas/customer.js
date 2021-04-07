const mongoose = require("mongoose");
const customer = new mongoose.Schema({
    username: String,
    password: String    
});

module.exports = mongoose.model("Customer", customer);