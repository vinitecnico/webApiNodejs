'use strict';
let MongoClient = require('mongodb').MongoClient;
let Q = require('q');
const config = require('../config');

module.exports = {

    connect: () => {
        const defer = Q.defer();
        MongoClient.connect(config.database, function (err, db) {
            console.log("Connected correctly to server");
            defer.resolve(db);
        });
        return defer.promise;
    },
    close: (db) => {
        db.close();
    }
};