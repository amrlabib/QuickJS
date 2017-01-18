var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



module.exports = function(app, passport, dbModule) {

    passport.serializeUser(function(user, done) {
    	console.log("in serializeUser");
    	console.log(user);
        done(null, user["_id"]);
    });

    passport.deserializeUser(function(id, done) {
    	console.log("in deserializeUser");
console.log(id);
        done(null, {id: id});
    });

    passport.use('user', new LocalStrategy(
        function(username, password, done) {
            dbModule.db.collection('users').find({ "username": username }).toArray(function(err, user) {
                if (err)
                    return done(err);

                if (!user[0])
                    return done(null, false, { message: 'Incorrect username.' });

                if (user[0] && user[0].password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user[0]);
            });
        }
    ));


};
