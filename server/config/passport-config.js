
const User = require("./../user");
const Admin = require("./../admin");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        'pp-user',
        // define our local strategy for passport
        // every time we use passport, this will happen
        new localStrategy((username, password, done) => {
            // find the user in the database
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                // if there's no user, null is the error and false is the user
                if (!user) return done(null, false); 
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                    return done(null, user);
                    } else {
                    return done(null, false);
                    }
                });
            });
        })
    );
    
    // store a serialised cookie in the broswer with user id
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    // finds user in database from cookie id
    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            // only store username and disregard other credentials
            // restrict data that's sent back to the client
            const userInformation = {
                username: user.username,
                id: user._id
            };
            cb(err, userInformation);
        });
    });



    passport.use(
        'pp-admin',
        // define our local strategy for passport
        // every time we use passport, this will happen
        new localStrategy((username, password, done) => {
            // find the admin in the database
            Admin.findOne({ username: username }, (err, admin) => {
                if (err) throw err;
                // if there's no user, null is the error and false is the admin user
                if (!admin) return done(null, false); 
                bcrypt.compare(password, admin.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                    return done(null, admin);
                    } else {
                    return done(null, false);
                    }
                });
            });
        })
    );
    
    // store a serialised cookie in the broswer with user id
    passport.serializeUser((admin, cb) => {
        cb(null, admin.id);
    });

    // finds user in database from cookie id
    passport.deserializeUser((id, cb) => {
        Admin.findOne({ _id: id }, (err, admin) => {
            // only store username and disregard other credentials
            // restrict data that's sent back to the client
            const adminInformation = {
                username: user.username
            };
            cb(err, adminInformation);
        });
    });









};