'use strict';

const ProductMiddleware = require('../middlewares/productMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {

    app.post('/api/product', function (req, res) {
        const product = req.body;
        const productMiddleware = new ProductMiddleware();
        productMiddleware.insert(category)
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