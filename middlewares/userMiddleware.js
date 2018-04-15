'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const UserMongoDb = require('../db/userMongoDb');
const Q = require('q');

class userMiddleware {

	constructor() {

	}

	getByToken(token) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.getByToken(token)
			.then(response => {
				defer.resolve(responseFormat.success(response));
			})
			.catch(error => {
				defer.reject(responseFormat.error(error));
			});
		return defer.promise;
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

	insert(user) {
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

	update(token, user) {
		const defer = Q.defer();
		const userMongoDb = new UserMongoDb();
		userMongoDb.update(token, user)
			.then(response => {
				defer.resolve(responseFormat.success(response));
			})
			.catch(error => {
				defer.reject(responseFormat.error(error));
			});

		return defer.promise;
	}
}

module.exports = userMiddleware;