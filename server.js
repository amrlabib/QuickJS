var express = require('express');
var app = new express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var dbModule = require('./server/config/db.js')(app);
var passport = require('passport');

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var sess = {

}

//express middlewares
app.use('/resources', express.static(__dirname + '/dist/resources'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./server/config/passport')(app, passport , dbModule);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    var allQuotes = dbModule.db.collection('users').find().toArray(function(err, results) {
        if (!req.session.username)
            req.session.username = "none";

        res.render('index.ejs', { users: results, session: req.session });
    });
});


require('./server/controllers/users.js')(app, dbModule);
require('./server/controllers/quotes.js')(app, dbModule);



// Start Node server on Port 5000
app.listen(5000, () => {
    console.log('listening on 5000');
});
