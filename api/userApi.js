'use strict';

const UserMiddleware = require('../middlewares/userMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/login/:email/:password', function (req, res) {
        var email = req.param('email');
        var password = req.param('password');
        const userMiddleware = new UserMiddleware();
        userMiddleware.get(email, password).then(function (response) {
            res.status(200).json(response);
        }).catch(function (e) {
            res.status(500, {
                error: e
            });
        });
    });

    app.post('/api/createUser', function (req, res) {
        //const token = req.body.token || null;
        //tokenHelper.validate(app, token).then(response => {
        //if (response) {
        const user = req.body;

        //const user = req.body.password;
        const userMiddleware = new UserMiddleware();
        userMiddleware.post(user).then(function (response) {
            res.status(200).json(response);
        }).catch(function (e) {
            res.status(500, {
                error: e
            });
        });
        // } else {
        //     return res.status(403).send({
        //         success: false,
        //         message: 'No token provided.'
        //     });
        // }
        //});
    });
};