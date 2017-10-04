const express = require('express');
const app = express();
const homeFile = require('./files/home.json');
const categorieFile = require('./files/categories.json');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/', function (req, res) {
    res.status(200).json({ success: true, data: homeFile });
});

app.get('/categories', function (req, res) {
    res.status(200).json({ success: true, data: categorieFile });
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});