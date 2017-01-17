var LocalStrategy = require('passport-local').Strategy;
var dbModule = require('../db');


module.exports = new LocalStrategy(function(username, password, done) {
    dbModule.db.collection('users').find({ "username": username }).toArray(function(err, user) {
        
        console.log(user);

        if (err)
            return done(err);

        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        console.log(user);

        return done(null, user);
    });
});
