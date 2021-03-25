
const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
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
                username: user.username
            };
            cb(err, userInformation);
        });
    });
  };