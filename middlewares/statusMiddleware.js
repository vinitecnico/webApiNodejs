'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const StatusMongoDb = require('../db/statusMongoDb');
const Q = require('q');

class statusMiddleware {
    constructor() { }

    insert(status) {
        const defer = Q.defer();
        const statusMongoDb = new StatusMongoDb();
        statusMongoDb.insert(status)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    update(id, status) {
        const defer = Q.defer();
        const statusMongoDb = new StatusMongoDb();
        statusMongoDb.update(id, status)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }

    getAll() {
        const defer = Q.defer();
        const statusMongoDb = new StatusMongoDb();
        statusMongoDb.getAll()
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
        const statusMongoDb = new StatusMongoDb();
        statusMongoDb.getById(id)
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = statusMiddleware;