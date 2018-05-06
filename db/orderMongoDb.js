'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const orderSchema = require('../schema/orderSchema');

class orderMongoDb {
    insert(order) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                order.created_at = new moment().toDate();
                order.updated_at = new moment().toDate();

                var orderDb = new orderSchema(order);
                orderDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    update(id, order) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    status: order.status,
                    products: order.products,
                    payment: order.payment,
                    updated_at: new moment().toDate()
                };

                db.model('orders').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
                    if (err || !result) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(newData);
                    }
                });
            });
        return defer.promise;
    }

    getAll(statusId, paymentId, initialDate, endDate) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                let filter = status != 'all' ? { statusId: status } : {};
                if (paymentId) {
                    filter.paymentId = paymentId;
                }

                if (initialDate && endDate) {
                    filter.created_at = { "$gte": new moment(initialDate).toDate(), "$lt": new moment(endDate).toDate() };
                }

                var query = db.model('orders').find(filter).sort('orderId');
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
                db.model('orders').findOne({_id: id}, (err, result) => {
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

module.exports = orderMongoDb;