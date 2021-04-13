// Passport: https://www.youtube.com/watch?v=IUw_TgRhTBE
// Express-validator: https://www.youtube.com/watch?v=z8m_Vy_9FIs

// ************************* IMPORTS *************************

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
// const bodyParser = require('body-parser') //deprecated
const { check, body,  validationResult } = require('express-validator')
const { cloudinary } = require('./config/cloudinary-config');
const fs = require('fs');
const https = require('https');

const app = express()
const Customer = require('./db-schemas/customer')
const Admin = require('./db-schemas/admin')

require('dotenv').config({path: './.env'})





// ************************* CONNECT TO MONGO *************************

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongoose is connected')
})

// console.log('process.env.MONGO_DB: ', process.env.MONGO_DB)

// // ************************* CLOUDINARY MIDDLEWARE *************************

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ************************* MIDDLEWARE *************************

// app.use(cors({
//     // origin: process.env.CLIENT_BASE_URL,
//     origin: 'https://sec-prog-app.lindev.ie',
//     credentials: true
// }))

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://sec-prog-app.lindev.ie");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// console.log('process.env.CLIENT_BASE_URL: ', process.env.CLIENT_BASE_URL)
// stores session data on the server side, not on the cookie itself
// uses memory storage
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    // store and uninitialised session
    saveUninitialized: true
}))


app.use(cookieParser(process.env.SESSION_SECRET));
// start passport
app.use(passport.initialize());
// start the session part of passport
app.use(passport.session());
require('./config/passport-config')(passport);




// ************************* API ROUTES *************************



// ************ CUSTOMER *********

app.post("/api/customer-login", (req, res, next) => {
    // use local strategy as definied in passportConfig.js file
    console.log(req.body);
    passport.authenticate("pp-user", (err, user, info) => {
        // console.log('login fired! user:', user)
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            
            // logIn is a passport method
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).send("User Successfully Authenticated");
            });
        }
      })(req, res, next);
})


app.post("/api/customer-register", [
        // https://express-validator.github.io/docs/validation-chain-api.html
        check('username') 
            
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long')
            .exists({checkNull: true, checkFalsy: true})
            .withMessage('Please enter a username'),
        check('password')
            .exists({checkNull: true, checkFalsy: true})
            .withMessage('Please enter a password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        check('password2', "Passwords don't match")
            .custom((pass2, { req }) => pass2 === req.body.password)

    ], (req, res, next) => {
        // console.log('RRRREQ: ',req)
        const errors = validationResult(req)

        // if we have errors
        if (!errors.isEmpty()) {
            console.log('errors is not empty');
            // console.log('REQ.BODY: ', req.body)
            console.log('ERRORS: ',errors)
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            // console.log('TYPEOF: ', Array.isArray(alert));
            // console.log('ALERT: ', alert)
            res.send(alert)  // was res.json
        
        } else {
            console.log('mongoose fired')
            Customer.findOne({username: req.body.username}, async (err, doc) => {
                if (err) throw err;
                if (doc) res.send('Customer Already Exists')
                // create a new user if no document comes back
                if (!doc) {
                    // hash the password
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const newCustomer = new Customer({
                        username: req.body.username,
                        password: hashedPassword
                    });
                    await newCustomer.save();
                    res.send('Customer Created')
                }
            })
        }


})


app.get("/api/get-customer", (req, res, next) => {
    // if user is authenticated, req.user will have user info
    // console.log('REQ.USER: ', req.user);

    if (req.user) {
        Customer.findOne({ _id: req.user.id }, (err, user) => {
            if (user) {
                res.send(req.user);
            } else {
                res.send(null)
            }
        })
    } else {
        res.send(null)
    }
})








// ************ ADMIN *********

app.post("/api/admin-login", (req, res, next) => {
    // use local strategy as definied in passportConfig.js file
    passport.authenticate("pp-admin", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No Admin Exists");
        else {
            // logIn is a passport method
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Admin Successfully Authenticated");
                // console.log(req.user);
            });
        }
      })(req, res, next);
})




app.get("/api/get-admin", (req, res, next) => {
    // if user is authenticated, req.user will have user info
    console.log('REQ.USER: ',req.user);

    if (req.user) {
        Admin.findOne({ _id: req.user.id }, (err, user) => {
            if (user) {
                res.send(req.user);
            } else {
                res.send(null)
            }
        })
    } else {
        res.send(null)
    }
})




app.get("/api/get-admin-info", (req, res, next) => {
    // if user is authenticated, req.user will have user info
    console.log('REQ.USER: ',req.user);

    if (req.user) {
        Admin.findOne({ _id: req.user.id }, (err, user) => {
            if (user) {
                Customer.find({}, (error, data) => {
                    if (error) res.send('Could not find customer data');
                    if (data) {
                        console.log('THE DATA IS: ', data);
                        res.send(data);
                    } else {
                        console.log('NO DATA')
                    }
                })


            } else {
                res.send('Could not find admin')
            }
        })
    } else {
        res.send(null)
    }
})


// ************ LOGOUT *********


app.get('/api/logout', function(req, res){
    req.logout();
    res.clearCookie('connect.sid', { path: '/' })
    res.status(200).send("Logged out successfully");
});



// ************************* CLOUDINARY IMAGE DOWNLOAD UPLOAD *************************

app.post('/api/images', async (req, res) => {
// app.post('/api/images', (req, res) => {
    
    if (req.user && req.user.id) {
        const { resources } = await cloudinary.search
        // const { resources } = cloudinary.search
            .expression('folder:sec-prog-app AND ' + req.user.id)
            .sort_by('public_id', 'desc')
            .max_results(1)
            .execute();

        const publicIds = resources.map((file) => file.public_id);
        res.send(publicIds);
    }
});


app.post('/api/upload', async (req, res) => {
    try {
        // console.log(req.body.image)
        const fileStr = req.body.image;
        const fileName = req.body.name

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'sec-prog-app',
            public_id: fileName,
            invalidate: true
        });
        // console.log('UPLOADRESPONSE:', uploadResponse);
        res.json({ msg: 'Image fetched successfully' });   // might not be json now with axios !!
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' }); // might not be json now with axios !!
    }
});



// ************************* SERVE HTTP *************************

// const PORT = 5001;

// app.listen(PORT, () => {
//     console.log('Server Has Started on Port ' + PORT)
// })

// ************************* SERVE HTTPS *************************

const port = 5001;
console.log('process.env.SSL_KEY: ',process.env.SSL_KEY)

const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  };

// const server = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpsServer.listen(port, () => {
    console.log(`HTTPS SERVER RUNNING : port ${port}`)
})