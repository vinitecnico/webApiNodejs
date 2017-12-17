const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const homeFile = require('./files/home.json');
const categorieFile = require('./files/categories.json');
const app = express();
const responseFormat = require('./helpers/responseFormatHelper');
const tokenHelper = require('./helpers/tokenHelper');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/', function (req, res) {
    res.status(200).json({ route: ["/api/home", "/api/categories"] });
});

app.get('/api/TsuHome', function (req, res) {
    res.status(200).json({ Success: true, Data: homeFile });
});

app.get('/api/categories', function (req, res) {
    res.status(200).json({ Success: true, Data: categorieFile });
});

app.get('/api/cep/:cep', function (req, res) {
    http.get('http://viacep.com.br/ws/' + req.param('cep') + '/json', (resp) => {
        resp.setEncoding('utf8');
        resp.on("data", function (chunk) {
            res.status(200).json(JSON.parse(chunk));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

app.post('/api/authenticate', function (req, res) {
    if (config.user == req.body.user && config.pwd == req.body.pwd) {
        const token = tokenHelper.create(app);
        res.status(200).json({ success: true, message: 'Enjoy your token!', token: token });
        console.log('token:' + token);
    } else {
        res.status(500).json(responseFormat.error('Authentication failed. User not found.'));
        console.log('Authentication failed. User not found.');
    }
});

const userApi = require('./api/userApi')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});