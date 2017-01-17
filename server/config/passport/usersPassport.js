var LocalStrategy = require('passport-local').Strategy;
var dbModule = require('../config/db.js');


module.exports = new LocalStrategy(function(username, password, done) {
    dbModule.db.collection('users').find({ "username" : username }).toArray(function(err, results) {
        var validUserAndPass = false;
        for (user in results) {
            if (results[user].username == req.body.username && results[user].password == req.body.password) {
                validUserAndPass = true;
                req.session.username = results[user].username;
                break;
            }
        }
        if (validUserAndPass)
            res.render('users/login.ejs', { loginMessage: "Current logged user is " + req.session.username });
        else
            res.render('users/login.ejs', { loginMessage: "Incorrect Username or Password" });
    });
});
