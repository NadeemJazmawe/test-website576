const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url,function(err,client){
    if(err){
        console.log(err);
    }else{
        var db = client.db('Tutorials')
        console.log("db connected");
        let animal = db.collection('animals');
        animal.find({}).toArray(function(err,result){
            console.log(JSON.stringify(result));
        })
    }
})