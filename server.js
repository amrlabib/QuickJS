var express = require('express');
var app = new express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var dbModule = require('./server/config/db.js')(app);
var passport = require('passport');
var path = require('path');

const serveStatic = require('serve-static');

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');


var sess = {
    resave: true,
    saveUninitialized: false,
    secret: "anysecret",
    name: 'sessionId',
    cookie: {
        secure: false
    }
}

//express middlewares
app.use('/resources', express.static(__dirname + '/dist/resources'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(serveStatic('dist', {
    'index': ['index.html'],
    'dotfiles': 'ignore',
    'maxAge': '7d'
}));


app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

require('./server/controllers/users.js')(app, dbModule);
require('./server/controllers/quotes.js')(app, dbModule);
require('./server/config/passport')(app, passport, dbModule);


app.get('/*', (req, res) => {
    // var allQuotes = dbModule.db.collection('users').find().toArray(function(err, results) {
    //     if (!req.session.username)
    //         req.session.username = "none";

    //     res.render('index.ejs', { users: results, session: req.session });
    // });
    res.sendFile(path.resolve('dist/index.html'));
});







// Start Node server on Port 5000
app.listen(5000, () => {
    console.log('listening on 5000');
});
