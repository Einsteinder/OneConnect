const express = require('express')
const app = express()
const router = express.Router();              // get an instance of the express Router
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config()
const path = require('path');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/test?retryWrites=true`;

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', router);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
router.get('/users', function(req, res) { 

    MongoClient.connect(uri,{ useNewUrlParser: true }, async function(err, client) {
        const collection = client.db("oneconnect").collection("users");
        let users = await collection.find({}).toArray()
        // perform actions on the collection object
        res.send(users)

        client.close();
     });
});

router.get('/users/:id', function(req, res) { 
    MongoClient.connect(uri,{ useNewUrlParser: true }, async function(err, client) {
        const collection = client.db("oneconnect").collection("users");
        let user = await collection.find({"_id":ObjectId(req.params.id)}).toArray()
        res.send(user)

        client.close();
     });

});

router.get('/users/search/:query', function(req, res) { 
    MongoClient.connect(uri,{ useNewUrlParser: true }, async function(err, client) {
        const collection = client.db("oneconnect").collection("users");
        let user = await collection.find({
            $or:   [{ name: { $regex: `.*${req.params.query}.*`, $options: 'i' } }, 
                    { age: { $regex: `.*${req.params.query}.*`, $options: 'i' }},
                    { gender:{ $regex: `.*${req.params.query}.*`, $options: 'i' } },
                    { email: { $regex: `.*${req.params.query}.*`, $options: 'i' }}]
          }).toArray()
        res.send(user)

        client.close();
     });

});
app.listen(8080);