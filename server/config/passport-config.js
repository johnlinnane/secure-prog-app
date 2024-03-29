
const Customer = require("../db-schemas/customer");
const Admin = require("../db-schemas/admin");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        'pp-user',
        // define our local strategy for passport
        // every time we use passport, this will happen
        new localStrategy((username, password, done) => {
            // find the user in the database
            Customer.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                // if there's no user, null is the error and false is the user
                if (!user) return done(null, false); 
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                    return done(null, user);
                    } else {
                    return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        })
    );
    

    // ******************* SERIALIZE / DESERIALIZE COOKIES *******************

    // store a serialised cookie in the broswer with user id
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

      
    passport.deserializeUser((id, done) => {
          
            Customer.findOne({ _id: id }, (err, user) => {
                if (user) {
                    const userInformation = {
                        username: user.username,
                        id: user._id
                    };
                    done(err, userInformation);
                }
            });
            
            Admin.findOne({ _id: id }, (err, user) => {
                if (user) {
                    const adminInformation = {
                        username: user.username,
                        id: user._id
                    };
                    done(err, adminInformation);
                }
            });
    });



    // *********************************************************


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
                    // ie. if password is incorrect
                    return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        })
    );
    







};