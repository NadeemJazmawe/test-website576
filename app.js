const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = "mongodb+srv://test-website567:Nn123456@nadeem-cluster.hevx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;//"mongodb://127.0.0.1:27017";
const port = process.env.PORT || 3000;

app.use("/", express.static(__dirname + "/"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/tasks/new", function(req, res){
    MongoClient.connect(url, function(err,client){
        var db = client.db('amazingtodoapp');
        let tasks = db.collection('tasks');
        tasks.insert({
            timestamp: new Date(),
            description: req.body.description
        })
    })

})

app.get("/tasks", function(req, res){
    MongoClient.connect(url, function(err, client){
        if(!err){
            var db = client.db('amazingtodoapp');
            let tasks = db.collection('tasks');
            tasks.find({}).toArray(function(error, results){
                res.send(JSON.stringify(results));
            })
        }
        else{
            console.log("error");
        }
    })
})

app.put("/tasks/update/:id",function(req, res){
    MongoClient.connect(url, function(err, client){
            var db = client.db('amazingtodoapp');
            let tasks = db.collection('tasks');
            tasks.updateOne(
                {_id: new ObjectId(req.params.id)},
                {$set: 
                    {description: req.body.description}})
            // var myquery = {_id: new ObjectId(req.params.id)};
            // var newvalue = {$set: {description: req.body.description}};
            // tasks.updateOne(myquery, newvalues, function(err, res) {
            //     if (err) throw err;
            //     console.log("1 document updated");
            //     db.close();
            //   });
    })
    res.send({ok:true});
    
})

app.get("/task/delete/:id", function(req, res){
    MongoClient.connect(url, function(err, client){
        var db = client.db('amazingtodoapp');
        let tasks = db.collection('tasks');
        tasks.remove({_id: new ObjectId(req.params.id)}, function(error, results){
            if(!err){
                console.log(results);
            }else{
                console.log(error);
            }
        })
    })
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.listen(port);
