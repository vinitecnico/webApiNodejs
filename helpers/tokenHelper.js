'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');
var Q = require('q');

class tokenHelper {
    static create(app) {
        return jwt.sign(config, app.get('tokenSecret'));
    }

    static validate(app, token) {
        const defer = Q.defer();
        jwt.verify(token, app.get('tokenSecret'), function (err, decoded) {
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