'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const PaymentMongoDb = require('../db/paymentMongoDb');
const Q = require('q');

class paymentMiddleware {
    constructor() { }

    insert(payment) {
        const defer = Q.defer();
        const paymentMongoDb = new PaymentMongoDb();
        paymentMongoDb.insert(payment)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, payment) {
        const defer = Q.defer();
        const paymentMongoDb = new PaymentMongoDb();
        paymentMongoDb.update(id, payment)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll(status) {
        const defer = Q.defer();
        const paymentMongoDb = new PaymentMongoDb();
        paymentMongoDb.getAll(status)
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
        const paymentMongoDb = new PaymentMongoDb();
        paymentMongoDb.getById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

}

module.exports = paymentMiddleware;