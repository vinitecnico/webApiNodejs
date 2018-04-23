'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const paymentSchema = require('../schema/paymentSchema');

class paymentMongoDb {

    constructor() { }

    insert(payment) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                payment.created_at = new moment().toDate();
                payment.updated_at = new moment().toDate();

                var paymentDb = new paymentSchema(payment);
                paymentDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, payment) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    name: payment.name,
                    img: payment.img,
                    status: payment.status,
                    updated_at: new moment().toDate()
                };

                db.model('payment').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(newData);
                    }
                });
            });
        return defer.promise;
    }

    getAll(status) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const filter = status != 'all' ? { status: status } : null;
                var query = db.model('payment').find(filter).sort('name');
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
                db.model('payment').findOne({_id: id}, (err, result) => {
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

module.exports = paymentMongoDb;