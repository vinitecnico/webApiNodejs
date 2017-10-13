'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const _ = require('lodash');

class timeMongoDb {

    constructor() {

    }

    insert(user) {
        const defer = Q.defer();
        mongodb.connect().then(response => {
            let db = response;

            db.collection("user").insertOne(user);
            defer.resolve(user);
        });
        return defer.promise;
    }

    select(email, password) {
        const defer = Q.defer();
        mongodb.connect().then(function (response) {
            let db = response;
            defer.resolve(db.collection('user').find({ 'email': email, 'password': password }));
        });
        return defer.promise;
    }
}

module.exports = timeMongoDb;