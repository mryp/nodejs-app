var express = require('express');
var router = express.Router();


router.get('/version', function(req, res, next) {
    res.json({
        version: '1.0.0',
        name: 'nodejs-app'
    });
});

router.post('/user', function(req, res, next) {
    const name = req.body.name;
    const dispname = req.body.dispname;
    if (name === undefined || dispname === undefined) {
        responseStatus(res, -1);
        return;
    }

    const mongo = require('mongodb').MongoClient;
    const dbUrl = 'mongodb://localhost:27017';
    const dbName = 'nodejsapp';
    mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        const users = db.collection("users");

        users.find({'name': name}).toArray(function(err, docs) {
            console.log(docs);
            if (docs.length > 0) {
                responseStatus(res, -2);
                client.close();
                return;
            }

            const data = {
                'name': name,
                'dispname': dispname
            };
            users.insertOne(data, function(err, result) {
                console.log(result);
                responseStatus(res, 0);
                client.close();
            });
        });
    });
});

router.get('/user', function(req, res, next) {
    console.log(req);
    const name = req.query.name;
    if (name === undefined) {
        responseStatus(res, -1);
        return;
    }

    const mongo = require('mongodb').MongoClient;
    const dbUrl = 'mongodb://localhost:27017';
    const dbName = 'nodejsapp';
    mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client) {
        const db = client.db(dbName);
        const users = db.collection("users");

        users.find({'name': name}).toArray(function(err, docs) {
            console.log(docs);
            if (docs.length === 0) {
                responseStatus(res, -2);
                return;
            }

            client.close();
            res.json({
                name: docs[0].name,
                dispname: docs[0].dispname
            });
        });
    });
});

function responseStatus(res, status) {
    res.json({
        status: status
    });
}

module.exports = router;
