const MongoClient = require('mongodb');
const uri = 'mongodb+srv://edukaizen:edukaizen@cluster0.wz2ol.mongodb.net/<dbname>?retryWrites=true&w=majority'

MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("edukaizen");
    var query = { "username": "aditya" };
    dbo.collection("users").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});