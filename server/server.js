const express = require('express');

const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();


require('dotenv').config({path: '../.env'})

mongoose.Promise = global.Promise;

mongoose.connect(process.env.REACT_APP_DB, { useNewUrlParser: true })
    .catch(error => console.log('MONGOOSE CONNECT ERROR: ', error));



const { Admin } = require('./models/admin');
const { Product } = require('./models/product');
const { User } = require('./models/user');


app.use(cors({
    credentials: true,
    origin: [
        'http://localhost:3000'
//         process.env.REACT_APP_CLIENT_PREFIX,
//         process.env.REACT_APP_DB, 
//         process.env.REACT_APP_CLIENT_BUILD_PREFIX,
//         process.env.REACT_APP_FILE_SERVER_PREFIX,
//         process.env.REACT_APP_PRODUCTION_PREFIX
    ]
}));
app.use(cookieParser());


app.get('/api/test', (req, res) => {
    console.log('server is working')
})


app.get('/api/get-all-products', (req, res) => {
    Product.find({}, (err, products) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(products);
    })
})



app.post('/api/set-cookie', (req, res) => {
    console.log('set-cookie called')
    res.cookie(
        'tc_auth_cookie', 
        'THIS_IS_THE_COOKIE_CONTENT', 
        { sameSite: 'lax', secure: false }
    ).send({cookieSet: true})
})



let authMiddleware = (req, res, next) => {
    let token = req.cookies.tc_auth_cookie;
    console.log('COOKIE CONTENTS: ', token);
    next()
}


app.get('/api/check-authentication-cookie', authMiddleware, (req, res) => {
    res.json({
        authChecked: true
    })
})


const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`SERVER RUNNING : port ${port}`)
})