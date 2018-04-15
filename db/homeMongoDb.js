'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');

class homeMongoDb {

    constructor() { }

    getAll() {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                let homeData = {
                    slides: [],
                    Highlights: []
                };

                var query = db.model('products').find({ hasSlide: true, status: true }).sort('productName');
                query.skip(0).limit(5).exec('find', function (err, result) {
                    if (err) {
                        defer.reject(err.message);
                    } else {
                        homeData.slides = result;
                        query = db.model('products').find({ hasHighlight: true, status: true }).sort('productName');
                        query.skip(0).limit(5).exec('find', function (err, result) {
                            if (err) {
                                defer.reject(err.message);
                            } else {
                                homeData.Highlights = result;
                                query = db.model('products').find({ hasHighlight: true, status: true }).sort('productName');
                                defer.resolve(homeData);
                            }
                        });
                    }
                });
            });
        return defer.promise;
    }

}

module.exports = homeMongoDb;