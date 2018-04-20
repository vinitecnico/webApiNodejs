'use strict';
const responseFormat = require('../helpers/responseFormatHelper');
const CustomerMongoDb = require('../db/customerMongoDb');
const Q = require('q');

class customerMiddleware {

	constructor() {

	}

	getByToken(token) {
		const defer = Q.defer();
		const customerMongoDb = new CustomerMongoDb();
		customerMongoDb.getByToken(token)
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
		const customerMongoDb = new CustomerMongoDb();
		customerMongoDb.login(email, password)
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
		const customerMongoDb = new CustomerMongoDb();
		customerMongoDb.insert(user)
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
		const customerMongoDb = new CustomerMongoDb();
		customerMongoDb.update(token, user)
			.then(response => {
				defer.resolve(responseFormat.success(response));
			})
			.catch(error => {
				defer.reject(responseFormat.error(error));
			});

		return defer.promise;
	}
}

module.exports = customerMiddleware;