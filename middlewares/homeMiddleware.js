'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const HomeMongoDb = require('../db/homeMongoDb');
const Q = require('q');

class homeMiddleware {

    constructor() { }

    getAll() {
        const defer = Q.defer();
        const homeMongoDb = new HomeMongoDb();
        homeMongoDb.getAll()
            .then(response => {
                defer.resolve(responseFormat.success(response));
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = homeMiddleware;