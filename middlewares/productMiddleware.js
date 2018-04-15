'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const ProductMongoDb = require('../db/productMongoDb');
const Q = require('q');

class productMiddleware {
    constructor() { }

    insert(product) {
        const defer = Q.defer();
        const productMongoDb = new ProductMongoDb();
        productMongoDb.insert(product)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, product) {
        const defer = Q.defer();
        const productMongoDb = new ProductMongoDb();
        productMongoDb.update(id, product)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll(categoryId, status, page, take) {
        const defer = Q.defer();
        const productMongoDb = new ProductMongoDb();
        productMongoDb.getAll(categoryId, status, page, take)
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
        const productMongoDb = new ProductMongoDb();
        productMongoDb.getById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = productMiddleware;