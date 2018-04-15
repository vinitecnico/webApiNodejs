'use strict';

const CategoryMiddleware = require('../middlewares/categoryMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/category/:status/:page/:take', (req, res) => {
        const status = req.param('status');
        const page = parseInt(req.param('page'));
        const take = parseInt(req.param('take'));
        const categoryMiddleware = new CategoryMiddleware();
        categoryMiddleware.getAll(status, page, take)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/category', function (req, res) {
        const category = req.body;
        const categoryMiddleware = new CategoryMiddleware();
        categoryMiddleware.insert(category)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/category/:id', function (req, res) {
        const id = req.param('id');
        const category = req.body;
        const categoryMiddleware = new CategoryMiddleware();
        categoryMiddleware.update(id, category)
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