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
}

module.exports = productMiddleware;