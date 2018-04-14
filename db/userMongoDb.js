'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const _ = require('lodash');
const md5 = require('md5');
const userModel = require('../schema/userSchema');
const tokenHelper = require('../helpers/tokenHelper');

class timeMongoDb {

    constructor() {

    }

    insert(user) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                user.created_at = new moment().toDate();
                user.updated_at = new moment().toDate();
                user.password = md5(user.password);
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

    update(token, user) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const newData = {
                    name: user.name,
                    birthday: user.birthday,
                    phone: user.phone,
                    zipCode: user.zipCode,
                    adress: user.adress,
                    adressNumber: user.adressNumber,
                    neighborhood: user.neighborhood,
                    city: user.city,
                    state: user.state,
                    complement: user.complement,
                    subscribeNews: user.subscribeNews,
                    updated_at: new moment().toDate()
                };

                db.model('users').findOneAndUpdate({ token: token }, newData, { upsert: true }, function (err, userSave) {
                    if (err || !userSave) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(userSave.token);
                    }
                });
            });
        return defer.promise;
    }

    login(email, password) {
        password = md5(password);
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

    getByToken(token) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                db.model('users').findOne({ token: token }, (err, result) => {
                    if (err || !result) {
                        defer.reject('Invalid token!');
                    } else {
                        const userItem = _.pick(result, ['name', 'birthday', 'cpf', 'phone', 'email', 'zipCode', 'adress', 'adressNumber',
                            'neighborhood', 'city', 'state', 'complement', 'subscribeNews', 'token']);
                        defer.resolve(userItem);
                    }
                });
            });
        return defer.promise;
    }
}

module.exports = timeMongoDb;