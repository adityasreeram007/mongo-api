var ex = require('express')
var app = ex();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const uri = 'mongodb+srv://edukaizen:edukaizen@cluster0.wz2ol.mongodb.net/<dbname>?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 5000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
app.post('/login', function(req, res) {
    console.log(req)
    var username = req.body.usename
    var password = req.body.pass
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("edukaizen");
        var query = { "username": username };
        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result[0].password === password) {
                return res.status('200').end()
            } else {
                return res.status('404').end()
            }
            db.close();
        });
    });

})