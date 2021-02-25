const express = require('express');

const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();


require('dotenv').config({path: '../.env'})

mongoose.Promise = global.Promise;

mongoose.connect(process.env.REACT_APP_DB, { useNewUrlParser: true })
    .catch(error => console.log('MONGOOSE CONNECT ERROR: ', error));



const { Admin } = require('./models/admin');
const { Product } = require('./models/product');
const { User } = require('./models/user');


app.use(cors());
// app.use(cors({
//     credentials: true,
//     origin: [
//         process.env.REACT_APP_CLIENT_PREFIX,
//         process.env.REACT_APP_DB, 
//         process.env.REACT_APP_CLIENT_BUILD_PREFIX,
//         process.env.REACT_APP_FILE_SERVER_PREFIX,
//         process.env.REACT_APP_PRODUCTION_PREFIX
//     ]
// }));



app.get('/api/test', (req, res) => {
    console.log('server is working')
})


app.get('/api/get-all-products', (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(products);
    })
})




const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`SERVER RUNNING : port ${port}`)
})