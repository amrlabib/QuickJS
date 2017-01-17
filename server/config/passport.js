var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(app, passport, dbModule) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('user', new LocalStrategy(
        function(username, password, done) {
            dbModule.db.collection('users').find({ "username": username }).toArray(function(err, user) {
                console.log(user);

                if (err)
                    return done(err);

                if (!user[0])
                    return done(null, false, { message: 'Incorrect username.' });

                if (user[0] && user[0].password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                console.log(user);

                return done(null, user);
            });
        }
    ));


};
