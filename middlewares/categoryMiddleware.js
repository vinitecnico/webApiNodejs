'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const CategoryMongoDb = require('../db/categoryMongoDb');
const Q = require('q');

class categoryMiddleware {
    constructor() { }

    insert(category) {
        const defer = Q.defer();
        const categoryMongoDb = new CategoryMongoDb();
        categoryMongoDb.insert(category)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, category) {
        const defer = Q.defer();
        const categoryMongoDb = new CategoryMongoDb();
        categoryMongoDb.update(id, category)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll(status, page, take) {
        const defer = Q.defer();
        const categoryMongoDb = new CategoryMongoDb();
        categoryMongoDb.getAll(status, page, take)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = categoryMiddleware;