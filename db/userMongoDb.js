'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const _ = require('lodash');
const userModel = require('../schema/userSchema');
const tokenHelper = require('../helpers/tokenHelper');

class timeMongoDb {

    constructor() {

    }

    insert(user) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                user.created_at = new Date();
                user.updated_at = new Date();
                user.token = tokenHelper.create(user);
                var userDb = new userModel(user);
                userDb.save(function (error, userSave) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(userSave.token);
                    }
                });
            });
        return defer.promise;
    }

    login(email, password) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                db.model('users').findOne({ email: email, password: password }, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid Username or Password!');
                    } else {
                        defer.resolve(result.token);
                    }
                });
            });
        return defer.promise;
    }
}

module.exports = timeMongoDb;