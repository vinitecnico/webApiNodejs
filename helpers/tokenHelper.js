'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');
var Q = require('q');

class tokenHelper {
    static create(tokenData) {
        return jwt.sign(tokenData, config.tokenSecret);
    }

    static validate(tokenData, token) {
        const defer = Q.defer();
        jwt.verify(token, config.tokenSecret, function (err, decoded) {
            if (err) {
                defer.resolve(false);
            } else {
                defer.resolve(true);
            }
        });
        return defer.promise;
    }
}

module.exports = tokenHelper;