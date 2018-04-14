'use strict';

const UserMiddleware = require('../middlewares/userMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/user/login/:email/:password', function (req, res) {
        var email = req.param('email');
        var password = req.param('password');
        const userMiddleware = new UserMiddleware();
        userMiddleware.login(email, password)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/user/:token', function (req, res) {
        const token = req.param('token');
        const userMiddleware = new UserMiddleware();
        userMiddleware.getByToken(token)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/user', function (req, res) {
        const user = req.body;
        const userMiddleware = new UserMiddleware();
        userMiddleware.insert(user)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/user/:token', function (req, res) {
        const token = req.param('token');
        const user = req.body;
        const userMiddleware = new UserMiddleware();
        userMiddleware.update(token, user)
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