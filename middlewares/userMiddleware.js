'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const UserMongoDb = require('../db/userMongoDb');
const Q = require('q');

class timeMiddleware {

	constructor() {

	}

	login(email, password) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.login(email, password)
			.then(response => {
				defer.resolve(responseFormat.success(response));
			})
			.catch(error => {
				defer.reject(responseFormat.error(error));
			});

		return defer.promise;
	}

	post(user) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.insert(user)
			.then(response => {
				defer.resolve(responseFormat.success(response));
			})
			.catch(error => {
				defer.reject(responseFormat.error(error));
			});

		return defer.promise;
	}
}

module.exports = timeMiddleware;