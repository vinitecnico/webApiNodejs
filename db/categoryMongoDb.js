'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const categorySchema = require('../schema/categorySchema');

class categoryMongoDb {

    constructor() { }

    insert(category) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                category.created_at = new moment().toDate();
                category.updated_at = new moment().toDate();

                var categoryDb = new categorySchema(category);
                categoryDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, category) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    categoryName: category.categoryName,
                    img: category.img,
                    status: category.status,
                    updated_at: new moment().toDate()
                };

                db.model('categories').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(newData);
                    }
                });
            });
        return defer.promise;
    }

    getAll(status, page, take) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const filter = status != 'all' ? { status: status } : null;
                var query = db.model('categories').find(filter).sort('-categoryName');
                query.skip(page * take).limit(take).exec('find', function (err, result) {
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
                db.model('categories').findOne({_id: id}, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid token!');
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }
}

module.exports = categoryMongoDb;