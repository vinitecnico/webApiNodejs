'use strict';

const ProductMiddleware = require('../middlewares/productMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.get('/api/product/:categoryId/:status/:page/:take', (req, res) => {
        const categoryId = req.param('categoryId');
        const status = req.param('status');
        const page = parseInt(req.param('page'));
        const take = parseInt(req.param('take'));
        const productMiddleware = new ProductMiddleware();
        productMiddleware.getAll(categoryId, status, page, take)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/product/:id', (req, res) => {
        const id = req.param('id');
        const productMiddleware = new ProductMiddleware();
        productMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/product', function (req, res) {
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.insert(product)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/product/:id', function (req, res) {
        const id = req.param('id');
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.update(id, product)
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