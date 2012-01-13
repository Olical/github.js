/**
 * API class for interacting with GitHub gists
 */
function gistsApi() {}

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

// Register the API
GitHub.registerApi('gists', gistsApi);