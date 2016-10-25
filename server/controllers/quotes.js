module.exports = function(app, dbModule) {

    app.get('/quotes/', (req, res) => {
        var allQuotes = dbModule.db.collection('quotes').find().toArray(function(err, results) {
            console.log(results);
            res.render('quotes/index.ejs', { quotes: results });
        });
    });


    app.post('/quotes', (req, res) => {
        dbModule.db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved quote to database');
            res.redirect('/quotes/');
        });
    });

    app.get('/quotes/delete/:id', (req, res) => {
        console.log("deleting quote");
        dbModule.db.collection('quotes').remove({ "_id": dbModule.ObjectID(req.params.id) }, function(err) {
            res.redirect('/quotes/');
        });
    });
};
