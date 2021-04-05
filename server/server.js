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

const app = express()
const User = require('./user')
const Admin = require('./admin')

require('dotenv').config({path: '../.env'})





// ************************* CONNECT TO MONGO *************************

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongoose is connected')
})



// // ************************* CLOUDINARY MIDDLEWARE *************************

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ************************* MIDDLEWARE *************************

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}))
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

// ************ USER *********

app.post("/api/login", (req, res, next) => {
    // use local strategy as definied in passportConfig.js file
    passport.authenticate("pp-user", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            // logIn is a passport method
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("User Successfully Authenticated");
                console.log(req.user);
            });
        }
      })(req, res, next);
})


app.post("/api/register", [
        // https://express-validator.github.io/docs/validation-chain-api.html
        check('username', 'Username must be at least 3 characters long')
            .exists()
            .isLength({ min: 3 }),
        check('password', 'Password must be at least 8 characters long')
            .exists()
            .isLength({ min: 8 })
            .custom((pw, { req, loc, path }) => {
                if (pw !== req.body.password2) {
                    throw new Error("Passwords don't match");
                }
            })

    ], (req, res, next) => {

        const errors = validationResult(req)
        // check if we have errors
        if (!errors.isEmpty()) {
            console.log('REQ.BODY: ', req.body)
            console.log('ERRORS: ',errors)
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            console.log('TYPEOF: ', Array.isArray(alert));
            console.log('ALERT: ', alert)
            res.send(alert)  // was res.json
        } 

        User.findOne({username: req.body.username}, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send('User Already Exists')
            // create a new user if no document comes back
            if (!doc) {
                // hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword
                });
                await newUser.save();
                res.send('User Created')
            }
        })
})


app.get("/api/user", (req, res, next) => {
    // if user is authenticated, req.user will have user info
    // console.log(req.user);
    res.send(req.user);
})


// ************ ADMIN *********

app.post("/api/admin-login", (req, res, next) => {
    // use local strategy as definied in passportConfig.js file
    passport.authenticate("pp-admin", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
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



// app.post("/api/admin-register", [
//     check('username', 'Username must be at least 3 characters long') // change to body() if using axios !!
//         .exists()
//         .isLength({ min: 3 }),
//     check('password', 'Password must be at least 8 characters long') // change to body() if using axios !!
//         .exists()
//         .isLength({ min: 8 })
//         .custom((pw, { req, loc, path }) => {
//             if (pw !== req.body.password2) {
//                 throw new Error("Passwords don't match");
//             }
//         })

// ], (req, res, next) => {

//     const errors = validationResult(req)
//     // check if we have errors
//     if (!errors.isEmpty()) {
//         console.log(errors)
//         // return res.status(422).jsonp(errors.array())
//         const alert = errors.array()
//         return res.json(alert) // might not be json now with axios !!
//     } 

//     Admin.findOne({username: req.body.username}, async (err, doc) => {
//         if (err) throw err;
//         if (doc) res.send('User Already Exists')
//         // create a new user if no document comes back
//         if (!doc) {
//             // hash the password
//             const hashedPassword = await bcrypt.hash(req.body.password, 10);
//             const newAdmin = new Admin({
//                 username: req.body.username,
//                 password: hashedPassword
//             });
//             await newAdmin.save();
//             res.send('Admin Created')
//         }
//     })
// })


app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// app.get('/api/logout', function (req, res){
//     req.session.destroy(function (err) {
//       res.redirect('/'); //Inside a callback… bulletproof!
//     });
// });

// ************************* CLOUDINARY IMAGE DOWNLOAD UPLOAD *************************

app.post('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:sec-prog-app AND ' + req.user.id)
        .sort_by('public_id', 'desc')
        .max_results(1)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
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
        console.log(uploadResponse);
        res.json({ msg: 'Image fetched successfully' });   // might not be json now with axios !!
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' }); // might not be json now with axios !!
    }
});



// ************************* SERVE *************************

const PORT = 5001;

app.listen(PORT, () => {
    console.log('Server Has Started on Port ' + PORT)
})