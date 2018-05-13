'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');
var Q = require('q');

class tokenHelper {
    static create(tokenData) {
        return jwt.sign(tokenData, config.tokenSecret, { expiresIn: '6h' });
    }

    static validate(token) {
        const defer = Q.defer();
        jwt.verify(token, config.tokenSecret, function (err, decoded) {
            if (err) {
                defer.reject(false);
            } else {
                defer.resolve(true);
            }
        });
        return defer.promise;
    }
}

module.exports = tokenHelper;