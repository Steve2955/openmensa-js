const request = require('request-promise-native');

/**
 * method for requesting a list of canteens
 *
 * @param {object} options optional options to be sent to the api
 * @param {number} options.limit max number of canteens returned (default: 100 = max)
 * @param {number} options.page offset value to request more than the limit of 100 canteens
 * @param {number} options.lat searches for canteens near given coordinates
 * @param {number} options.lng searches for canteens near given coordinates
 * @param {number} options.dist maximum distance to search for canteens near given coordinates (requires latitude and longitude)
 * @param {array} options.ids list of canteen IDs that should be returned
 * @param {boolean} options.hasCoordinates only canteens with (true) or without (false) coordinates will be returned
 * @returns {promise} the api response
 */
module.exports.getCanteens = options => new Promise((resolve, reject) => {
	options = options || {};
	request({
		uri: 'https://openmensa.org/api/v2/canteens',
		qs: {
			limit: options.limit || 100,
			page: options.page || undefined,
			'near[lat]': options.lat || undefined,
			'near[lng]': options.lng || undefined,
			'near[dist]': options.dist || undefined,
			ids: options.ids ? options.ids.join() : undefined,
			hasCoordinates: options.hasCoordinates || undefined,
		},
		json: true,
	}).then((canteens) => {
		resolve(canteens);
	})
	.catch((err) => {
		reject(err);
	});
});

/**
 * method for requesting info about a canteen
 *
 * @param {number} id the canteen’s numeric ID
 * @returns {promise} the api response
 */
module.exports.getCanteen = id => new Promise((resolve, reject) => {
	request({
		uri: `https://openmensa.org/api/v2/canteens/${id}`,
		json: true,
	}).then((canteen) => {
		resolve(canteen);
	})
	.catch((err) => {
		reject(err);
	});
});

/**
 * method for requesting opening information about a canteen
 *
 * @param {number} id the canteen’s numeric ID
 * @param {object} options optional options to be sent to the api
 * @param {date} options.start start date (default: today)
 * @param {number} options.limit max number of canteens returned (default: 100 = max)
 * @returns {promise} the api response
 */
module.exports.getDays = (id, options) => new Promise((resolve, reject) => {
	options = options || {};
	if(options.start && options.start instanceof Date) options.start = options.start.toISOString().slice(0, 10);
	request({
		uri: `https://openmensa.org/api/v2/canteens/${id}/days`,
		qs: {
			limit: options.limit || 100,
			start: options.start || undefined,
		},
		json: true,
	}).then((days) => {
		resolve(days);
	})
	.catch((err) => {
		reject(err);
	});
});

/**
 * method for requesting opening information about a canteen on a specified date
 *
 * @param {number} id the canteen’s numeric ID
 * @param {Date} date
 * @returns {promise} the api response
 */
module.exports.getDay = (id, date) => new Promise((resolve, reject) => {
	if(date && date instanceof Date) date = date.toISOString().slice(0, 10);
	request({
		uri: `https://openmensa.org/api/v2/canteens/${id}/days/${date}`,
		json: true
	}).then((day) => {
		resolve(day);
	})
	.catch((err) => {
		reject(err);
	});
});

/**
 * method for requesting a list of available meals at a specified canteen on a specified day
 *
 * @param {number} id the canteen’s numeric ID
 * @param {date} date
 * @returns {promise} the api response
 */
module.exports.getMeals = (id, date) => new Promise((resolve, reject) => {
	if(date && date instanceof Date) date = date.toISOString().slice(0, 10);
	request({
		uri: `https://openmensa.org/api/v2/canteens/${id}/days/${date}/meals`,
		json: true,
	}).then((meals) => {
		resolve(meals);
	})
	.catch((err) => {
		reject(err);
	});
});

/**
 * method for requesting information on a specified meal at a specified canteen on a specified day
 *
 * @param {number} id the canteen’s numeric ID
 * @param {date} date
 * @param {meal} meal the meals’s numeric ID
 * @returns {promise} the api response
 */
module.exports.getMeal = (id, date, meal) => new Promise((resolve, reject) => {
	if(date && date instanceof Date) date = date.toISOString().slice(0, 10);
	request({
		uri: `https://openmensa.org/api/v2/canteens/${id}/days/${date}/meals/${meal}`,
		json: true,
	}).then((meal) => {
		resolve(meal);
	})
	.catch((err) => {
		reject(err);
	});
});
