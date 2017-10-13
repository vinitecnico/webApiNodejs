'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const UserMongoDb = require('../db/userMongoDb');
const Q = require('q');

class timeMiddleware {

	constructor() {

	}

	get(email, password) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.select(email, password).then(response => {			
			let cursor = response;			
			cursor.toArray(function (err, docs) {
				defer.resolve(responseFormat.success(docs));
			 });
		});

		return defer.promise;
	}

	post(user) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.insert(user).then(response => {
			defer.resolve(responseFormat.success(response));
		});

		return defer.promise;
	}
}

module.exports = timeMiddleware;