'use strict';

const HomeMiddleware = require('../middlewares/homeMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {
    app.get('/api/home', (req, res) => {
        const status = req.param('status');
        const page = parseInt(req.param('page'));
        const take = parseInt(req.param('take'));
        const homeMiddleware = new HomeMiddleware();
        homeMiddleware.getAll()
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });
};