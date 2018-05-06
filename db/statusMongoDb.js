'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const statusSchema = require('../schema/statusSchema');

class statusMongoDb {

    constructor() { }

    insert(status) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                status.created_at = new moment().toDate();
                status.updated_at = new moment().toDate();

                var statusDb = new statusSchema(status);
                statusDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, status) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    name: status.name,
                    userId: status.userId,
                    updated_at: new moment().toDate()
                };

                db.model('status').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(newData);
                    }
                });
            });
        return defer.promise;
    }

    getAll() {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const filter = null;
                var query = db.model('status').find(filter).sort('name');
                query.exec('find', function (err, result) {
                    if (err) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    getById(id) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                db.model('status').findOne({_id: id}, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid id!');
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

}

module.exports = statusMongoDb;