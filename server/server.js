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
const axios = require('axios');

const app = express()
const Customer = require('./db-schemas/customer')
const Admin = require('./db-schemas/admin')

require('dotenv').config({path: './.env'})





// // ************************* CLOUDINARY MIDDLEWARE *************************

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ************************* MIDDLEWARE *************************



app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true
}))


// stores session data on the server side, not on the cookie itself
// uses memory storage
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


app.use(cookieParser(process.env.SESSION_SECRET));
// start passport
app.use(passport.initialize());
// start the session part of passport
app.use(passport.session());
require('./config/passport-config')(passport);




// ************************* CONNECT TO MONGO *************************

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw console.error(err);
    console.log('Mongoose is connected')
})





// ************************* API ROUTES *************************

async function validateHuman(token) {
    let secret = process.env.RECAPTCHA_SECRET_KEY;
    // const secret = '6Lf6RKsaAAAAAFCZznVwocILK6HbGBZIqTAKV2tp';
    const response = await axios({
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        method: 'POST'
    })

    const data = await response;

    return data.data.success;
    // return false;
}

// ************ CUSTOMER *********

app.post("/api/customer-login", async (req, res, next) => {
    // use local strategy as definied in passportConfig.js file


    console.log('captToken', req.body.token);
    const human = await validateHuman(req.body.token);
    console.log('human', human);

    if (!human) {
        res.status(400).send('Recaptcha identifies user as a bot.')
        return;
    }

    passport.authenticate("pp-user", (err, user, info) => {
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
        const errors = validationResult(req)

        // if we have errors
        if (!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            res.send(alert)  // was res.json
        
        } else {
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
            });
        }
      })(req, res, next);
})




app.get("/api/get-admin", (req, res, next) => {
    // if user is authenticated, req.user will have user info

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
    if (req.user) {
        Admin.findOne({ _id: req.user.id }, (err, user) => {
            if (user) {
                Customer.find({}, (error, data) => {
                    if (error) res.send('Could not find customer data');
                    if (data) {
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
        res.status(401).send('Admin not logged in')
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
        const fileStr = req.body.image;
        const fileName = req.body.name

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'sec-prog-app',
            public_id: fileName,
            invalidate: true
        });
        res.json({ msg: 'Image fetched successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});



// ************************* SERVE HTTP *************************

// const PORT = 5001;

// app.listen(PORT, () => {
//     console.log('Server Has Started on Port ' + PORT)
// })

// ************************* SERVE HTTPS *************************

const port = 5001;

const options = {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  };

// const server = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpsServer.listen(port, () => {
    console.log(`HTTPS SERVER RUNNING : port ${port}`)
})