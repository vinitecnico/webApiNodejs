'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const OrderMongoDb = require('../db/orderMongoDb');
const Q = require('q');

class orderMiddleware {
    constructor() { }

    insert(order) {
        const defer = Q.defer();
        const orderMongoDb = new OrderMongoDb();
        orderMongoDb.insert(order)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, order) {
        const defer = Q.defer();
        const orderMongoDb = new OrderMongoDb();
        orderMongoDb.update(id, order)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll(statusId, paymentId, initialDate, endDate) {
        const defer = Q.defer();
        const orderMongoDb = new OrderMongoDb();
        orderMongoDb.getAll(statusId, paymentId, initialDate, endDate)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getById(id) {
        const defer = Q.defer();
        const orderMongoDb = new OrderMongoDb();
        orderMongoDb.getById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = orderMiddleware;