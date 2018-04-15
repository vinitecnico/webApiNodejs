const moment = require('moment');
const productSchema = require('../schema/productSchema');

class productMongoDb {

    constructor() { }

    insert(product) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                product.created_at = new moment().toDate();
                product.updated_at = new moment().toDate();

                var productDb = new productSchema(product);
                productDb.save(function (error, result) {
                    if (error) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    // update(id, category) {
    //     const defer = Q.defer();
    //     mongodb.connect()
    //         .then(db => {
    //             const newData = {
    //                 categoryName: category.categoryName,
    //                 img: category.img,
    //                 status: category.status,
    //                 updated_at: new moment().toDate()
    //             };

    //             db.model('categories').findOneAndUpdate({ _id: id }, newData, { upsert: true }, function (err, result) {
    //                 if (err || !result) {
    //                     defer.reject(err.message);
    //                 } else {
    //                     defer.resolve(newData);
    //                 }
    //             });
    //         });
    //     return defer.promise;
    // }

    // getAll(status, page, take) {
    //     const defer = Q.defer();
    //     mongodb.connect()
    //         .then(db => {
    //             const filter = status != 'all' ? { status: status } : null;
    //             var query = db.model('categories').find(filter).sort('-categoryName');
    //             query.skip(page * take).limit(take).exec('find', function (err, result) {
    //                 if (err) {
    //                     defer.reject(err.message);
    //                 } else {
    //                     defer.resolve(result);
    //                 }
    //             });
    //         });
    //     return defer.promise;
    // }
}

module.exports = productMongoDb;