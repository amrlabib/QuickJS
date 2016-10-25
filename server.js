var express = require('express');
var app = new express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var dbModule = require('./server/config/db.js')(app);

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');

//express middlewares
app.use('/resources', express.static(__dirname + '/dist/resources'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));



app.get('/', (req, res) => {
    var allQuotes = dbModule.db.collection('quotes').find().toArray(function(err, results) {
        if (!req.session.username) 
            req.session.username = "none";

        console.log(results);
        //res.sendFile('index.html', { root: path.join(__dirname, 'dist/') });
        res.render('index.ejs', { quotes: results, session: req.session });
    });
});


require('./server/controllers/users.js')(app, dbModule);
require('./server/controllers/quotes.js')(app, dbModule);


// Start Node server on Port 5000
app.listen(5000, () => {
    console.log('listening on 5000');
});
