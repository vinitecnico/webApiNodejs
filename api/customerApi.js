'use strict';

const CustomerMiddleware = require('../middlewares/customerMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/customer/login/:email/:password', function (req, res) {
        var email = req.param('email');
        var password = req.param('password');
        const customerMiddleware = new CustomerMiddleware();
        customerMiddleware.login(email, password)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/customer/:token', function (req, res) {
        const token = req.param('token');
        const customerMiddleware = new CustomerMiddleware();
        customerMiddleware.getByToken(token)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/customer', function (req, res) {
        const customerMiddleware = new CustomerMiddleware();
        if (req.headers.token) {
            tokenHelper.validate(req.headers.token)
                .then(function (validate) {
                    if (validate) {
                        customerMiddleware.getAll()
                            .then(function (response) {
                                res.status(200).json(response);
                            })
                            .catch(function (e) {
                                res.status(500).json(e);
                            });
                    } else {
                        res.status(403).json(responseFormat.error('invalid token!'));
                    }
                });
        } else {
            res.status(403).json(responseFormat.error('invalid token!'));
        }
    });

    app.post('/api/customer', function (req, res) {
        const user = req.body;
        const customerMiddleware = new CustomerMiddleware();
        customerMiddleware.insert(user)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/customer/:token', function (req, res) {
        const token = req.param('token');
        const user = req.body;
        const customerMiddleware = new CustomerMiddleware();
        customerMiddleware.update(token, user)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });
};