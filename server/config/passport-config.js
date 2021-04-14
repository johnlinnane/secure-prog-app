
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
            console.log('mongoooooose')
        })
    );
    

    // ******************* SERIALIZE / DESERIALIZE COOKIES *******************

    // store a serialised cookie in the broswer with user id
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // // finds user in database from cookie id
    // passport.deserializeUser((id, cb) => {
    //     Customer.findOne({ _id: id }, (err, user) => {
    //         // only store username and disregard other credentials
    //         // restrict data that's sent back to the client
    //         const userInformation = {
    //             username: user.username,
    //             id: user._id
    //         };
    //         cb(err, userInformation);
    //     });
    // });



    // passport.serializeUser((user, cb) => {
    //     if (user instanceof Customer) {
    //       cb(null, { id: user.id, type: 'Account' });
    //     } else {
    //       cb(null, { id: user.id, type: 'User' });
    //     }
    //   });
      
    passport.deserializeUser((id, done) => {
        // if (id.type === 'Customer') {
            console.log('deserialize called')
          
        //     // Account.get(id.id).then((account) => cb(null, account));
            Customer.findOne({ _id: id }, (err, user) => {
                // only store username and disregard other credentials
                // restrict data that's sent back to the client
                if (user) {
                    console.log('USER.FINDONE FIRED')
                    console.log('ERR', err)
                    console.log('USER', user)
                    
                    const userInformation = {
                        username: user.username,
                        id: user._id
                    };
                    
                    done(err, userInformation);
                }
            });
            
            Admin.findOne({ _id: id }, (err, user) => {
                // only store username and disregard other credentials
                // restrict data that's sent back to the client
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
                    console.log(result)
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
    
    // // store a serialised cookie in the broswer with user id
    // passport.serializeUser((admin, cb) => {
    //     cb(null, admin.id);
    // });

    // // finds user in database from cookie id
    // passport.deserializeUser((id, cb) => {
    //     Admin.findOne({ _id: id }, (err, admin) => {
    //         // only store username and disregard other credentials
    //         // restrict data that's sent back to the client
    //         const adminInformation = {
    //             username: admin.username
    //         };
    //         cb(err, adminInformation);
    //     });
    // });









};