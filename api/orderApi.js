'use strict';

const OrderMiddleware = require('../middlewares/orderMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {
    app.get('/api/order/:id', (req, res) => {
        const id = req.param('id');
        const orderMiddleware = new OrderMiddleware();
        orderMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/order/filter', function (req, res) {
        const order = req.body;
        const orderMiddleware = new OrderMiddleware();
        orderMiddleware.getAll(order.statusId, order.paymentId, order.initialDate, order.endDate)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.post('/api/order', function (req, res) {
        const order = req.body;
        const orderMiddleware = new OrderMiddleware();
        orderMiddleware.insert(order)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/order/:id', function (req, res) {
        const id = req.param('id');
        const order = req.body;
        const orderMiddleware = new OrderMiddleware();
        orderMiddleware.update(id, order)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });
}