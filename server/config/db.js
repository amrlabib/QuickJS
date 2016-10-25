module.exports = function(app) {
    var module = {};
    var mongo = require('mongodb');
    module.db = null;
    module.ObjectID = mongo.ObjectID;
    module.MongoClient = mongo.MongoClient;
    module.MongoClient.connect('mongodb://admin:1234@ds035836.mlab.com:35836/nodeamrtest', (err, database) => {
        if (err) return console.log(err)
        module.db = database;
    });    
    return module;   
};
