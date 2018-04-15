'use strict';

const http = require('http');

module.exports = function (app) {

    app.get('/api/zipcode/:cep', function (req, res) {
        http.get('http://viacep.com.br/ws/' + req.param('cep') + '/json', (resp) => {
            resp.setEncoding('utf8');
            resp.on("data", function (chunk) {
                res.status(200).json(JSON.parse(chunk));
            });
        }).on("error", (err) => {            
            res.status(500).json(JSON.parse(err.message));
        });
    });
};