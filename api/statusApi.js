'use strict';

const StatusMiddleware = require('../middlewares/statusMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {
    app.get('/api/status', (req, res) => {
        const statusMiddleware = new StatusMiddleware();
        statusMiddleware.getAll()
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/status/:id', (req, res) => {
        const id = req.param('id');
        const statusMiddleware = new StatusMiddleware();
        statusMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/status', function (req, res) {
        const status = req.body;
        const statusMiddleware = new StatusMiddleware();
        statusMiddleware.insert(status)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/status/:id', function (req, res) {
        const id = req.param('id');
        const status = req.body;
        const statusMiddleware = new StatusMiddleware();
        statusMiddleware.update(id, status)
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