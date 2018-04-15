'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const productSchema = require('../schema/productSchema');

class productMongoDb {

    constructor() { }

    insert(product) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                var productDb = new productSchema(product);
                productDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, product) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                product.updated_at = new moment().toDate()

                db.model('products').findOneAndUpdate({ _id: id }, product, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(product);
                    }
                });
            });
        return defer.promise;
    }

    getAll(categoryId, status, page, take) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                let filter = { categoryId: categoryId };
                if (status != 'all') {
                    filter.status = status;
                }

                var query = db.model('products').find(filter).sort('productName');
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
                db.model('products').findOne({_id: id}, (err, result) => {
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

module.exports = productMongoDb;