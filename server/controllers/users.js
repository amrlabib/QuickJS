var passport = require('passport');
var helper = require('./helper');


module.exports = function(app, dbModule) {

    app.get('/users/login/', (req, res) => {
        console.log("in login page");
        res.render('users/login.ejs', { loginMessage: "Current logged user is " + req.session.username });
    });


    app.post('/users/login/', (req, res) => {
        console.log("in login page post");
        var allUsers = dbModule.db.collection('users').find().toArray(function(err, results) {
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

    app.get('/users/', (req, res) => {
        var allUsers = dbModule.db.collection('users').find().toArray(function(err, results) {
            console.log(results);
            res.render('users/index.ejs', { users: results });
        });
    });

    app.get('/users/logout', (req, res) => {
        console.log("in logout route");
        req.session.username = "none";
        res.render('users/login.ejs', { loginMessage: "Current logged user is " + req.session.username, session: req.session });
    });


    app.get('/users/signup/', (req, res) => {
        console.log("in signup page");
        res.render('users/signup.ejs');
    });

    app.post('/users/signup/', (req, res) => {
        dbModule.db.collection('users').save(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved user to database');
            res.redirect('/');
        });
    });

    app.get('/users/delete/:id', (req, res) => {
        console.log("deleting user");
        dbModule.db.collection('users').remove({ "_id": dbModule.ObjectID(req.params.id) }, function(err) {
            res.redirect('/');
        });
    });



    /////// APIs used for Angular and React app src ///////

    app.get('/api/users/authorize/', authorize);
    app.post('/api/users/login/', login);
    app.get('/api/users/logout/', logout);


    app.post('/api/users/signup/', (req, res) => {
        var user = { username: req.body.username, password: req.body.password, email: req.body.email };
        dbModule.db.collection('users').save(user, (err, result) => {
            if (err) 
                return console.log(err);

            helper.Email.sendEmail(user);

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "status": "sho3'l fanade2" }));
        });
    });

    app.get('/api/users/', authorizeUser, (req, res) => {
        var allUsers = dbModule.db.collection('users').find().toArray(function(err, results) {

            res.send(JSON.stringify(results));
        });
    });


    //no authorization for deleting all users!
    app.get('/api/users/delete/', (req, res) => {
        console.log("deleting all users");
        dbModule.db.collection('users').remove(function(err) {

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: "successfully deleted all users" }));
        });
    });

    app.get('/api/users/:id', authorizeUser, (req, res) => {
        dbModule.db.collection('users').find({ "_id": dbModule.ObjectID(req.params.id) }).toArray(function(err, result) {
            console.log(result);

            res.setHeader('Content-Type', 'application/json');

            res.send(JSON.stringify({ message: "Successfully retrieved user", user: result[0] }));
        });
    });

    app.get('/api/users/delete/:id', authorizeUser, (req, res) => {
        console.log("got the following id for deleting user : " + req.params.id);
        dbModule.db.collection('users').remove({ "_id": dbModule.ObjectID(req.params.id) }, function(err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: "successfully deleted user", _id: req.params.id }));
        });
    });





    function login(req, res, next) {
        passport.authenticate('user', function(err, user, info) {

            if (err) {
                console.log("inside error");
                return next(err);
            }

            if (!user) {
                console.log("inside not user error");
                return res.status(401).json({
                    "status": "fail",
                    "data": { message: info }
                });
            }

            // Passport exposes a login() function on req (also aliased as
            // logIn()) that can be used to establish a login session

            req.logIn(user, function(err) {
                if (err) {

                    return res.status(500).json({
                        "status": "error",
                        "message": err
                    });
                }

                return res.status(200).json({
                    "status": "success",
                    "data": { user }
                });
            });

        })(req, res, next);
    }


    function logout(req, res) {
        req.logOut();
        req.session.destroy(function() {
            req.user = null;
            req.session = null;
            res.status(200).json({
                "status": "success"
            });
        });
    };


    function authorize(req, res, next) {

        if (req.user) {
            res.status(200).json({
                "status": "Success",
                "user": req.user
            });
        } else {
            res.status(401).json({
                "status": "fail",
                "data": { "message": "unauthorized" }
            });
        }
    }

    function authorizeUser(req, res, next) {
        //currently not authorizing user is logged in just to simplify application testing, we need to remove or true later
        //|| true 
        if (req.user) {
            next();
        } else {
            res.status(401).json({
                "status": "fail",
                "data": { "message": "unauthorized" }
            });
        }
    }
};
