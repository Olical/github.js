/**
 * API class for interacting with GitHub gists
 */
function gistsApi() {}

/**
 * Lists either all public gists or the gists of the authenticated user
 * 
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.get = function(callback) {
	return this.instance.get({
		urlTemplate: '/gists'
	}, callback);
};

/**
 * Lists public gists
 * 
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.getPublic = function(callback) {
	return this.instance.get({
		urlTemplate: '/gists/public'
	}, callback);
};

/**
 * Lists the authenticated users starred gists
 * 
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.getStarred = function(callback) {
	return this.instance.get({
		urlTemplate: '/gists/starred'
	}, callback);
};

/**
 * Retrieves a users gists
 * 
 * @param {String} user The user to get the gists from
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.getFromUser = function(user, callback) {
	return this.instance.get({
		urlTemplate: '/users/${user}/gists',
		urlData: {
			user: user
		}
	}, callback);
};

/**
 * Retrieves the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to get
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.getById = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}',
		urlData: {
			id: id
		}
	}, callback);
};

// Register the API
GitHub.registerApi('gists', gistsApi);