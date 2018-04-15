const express = require('express');
const bodyParser = require('body-parser');
const homeFile = require('./files/home.json');
const categorieFile = require('./files/categories.json');
const app = express();
const responseFormat = require('./helpers/responseFormatHelper');
const tokenHelper = require('./helpers/tokenHelper');

var admin = require("firebase-admin");

var serviceAccount = require("./files/myapp-101089-firebase-adminsdk-58ito-ef81262c69.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myapp-101089.firebaseio.com"
});

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

app.get('/api/firebase', function (req, res) {
    var registrationTokens = [
        "dfX60OyQeJw:APA91bFLFBlJJ_wk2PE7FtAhiG_4wdqCrCcNJOvpTCwFO1c5bsJxwg-EvO_AhIan3bqST9LOBvHfU2IDNfQNkAjSGeP7sbzcHrQd6G-mfrNRxWdkkUe8RWXDQr-yoYk0KNtClbvW4VDZ"
    ];

    var payload = {
        notification: {
            title: "This is a Notification",
            body: "This is the body of the notification message. ;(",
            message: "This is the body of the notification message. ;)"
        },
        data: {
            message: 'This is the body of the notification message'
        }
    };

    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    // Send a message to the devices corresponding to the provided
    // registration tokens.
    admin.messaging().sendToDevice(registrationTokens, payload, options)
        .then(function (response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });

    res.status(200).json({ Success: true, Data: payload });
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
const zipCodeApi = require('./api/zipCodeApi')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});