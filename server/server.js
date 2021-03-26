// Passport: https://www.youtube.com/watch?v=IUw_TgRhTBE
// Express-validator: https://www.youtube.com/watch?v=z8m_Vy_9FIs

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const bodyParser = require('body-parser')
const XXX = require('express-validator)


const app = express()
const User = require('./user')

mongoose.connect("mongodb+srv://john:umBongo!!@cluster0.1yk1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongoose is connected')
})


// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(session({
     secret:'secretcode',
     resave: true,
     saveUninitialized: true
}))

app.use(cookieParser("secretcode"));
// start passport
app.use(passport.initialize());
// start the session part of passport
app.use(passport.session());
require('./passportConfig')(passport);
// End of Middleware



// Routes
app.post("/login", (req, res, next) => {
    // use local strategy as definied in passportConfig.js file
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            // logIn is a passport method
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
      })(req, res, next);
})


app.post("/register", (req, res, next) => {
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


app.get("/user", (req, res, next) => {
    // if user is authenticated, req.user will have user info
    res.send(req.user);
})


app.listen(4000, () => {
    console.log('Server Has Started')
})