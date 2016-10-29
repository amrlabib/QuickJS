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
                if (results[user].username == req.body.username && results[user].passowrd == req.body.passowrd) {
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
            res.redirect('/users/');
        });
    });

    app.get('/users/delete/:id', (req, res) => {
        console.log("deleting user");
        dbModule.db.collection('users').remove({ "_id": dbModule.ObjectID(req.params.id) }, function(err) {

            res.redirect('/users/');
        });
    });



    /////// APIs ///////

    app.post('/api/users/signup/', (req, res) => {
        dbModule.db.collection('users').save(req.body, (err, result) => {
            if (err) return console.log(err)

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ "status": "sho3'l fanade2" }));
        });
    });


    app.get('/api/users/', (req, res) => {
        var allUsers = dbModule.db.collection('users').find().toArray(function(err, results) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(results));
        });
    });


    app.get('/api/users/delete/:id', (req, res) => {
        dbModule.db.collection('users').remove({ "_id": dbModule.ObjectID(req.params.id) }, function(err) {

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: "successfully deleted " }));
        });
    });
};
