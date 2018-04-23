'use strict';

const PaymentMiddleware = require('../middlewares/paymentMiddleware');
const tokenHelper = require('../helpers/tokenHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {
    app.get('/api/payment/:status', (req, res) => {
        const paymentId = req.param('paymentId');
        const status = req.param('status');
        const paymentMiddleware = new PaymentMiddleware();
        paymentMiddleware.getAll(status)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.get('/api/payment/id/:id', (req, res) => {
        const id = req.param('id');
        const paymentMiddleware = new PaymentMiddleware();
        paymentMiddleware.getById(id)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    });

    app.post('/api/payment', function (req, res) {
        const payment = req.body;
        const paymentMiddleware = new PaymentMiddleware();
        paymentMiddleware.insert(payment)
            .then(function (response) {
                res.status(200).json(response);
            })
            .catch(function (e) {
                res.status(500).json({
                    error: e
                });
            });
    });

    app.put('/api/payment/:id', function (req, res) {
        const id = req.param('id');
        const payment = req.body;
        const paymentMiddleware = new PaymentMiddleware();
        paymentMiddleware.update(id, payment)
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