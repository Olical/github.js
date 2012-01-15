/**
 * API class for interacting with GitHub gists
 */
function gistsApi() {}

/**
 * Creates a gist with the data you provide
 * The settings object can contain a description, public flag and file list
 * All parameters are required apart from the description
 * The object should look like this
 * 
 * 	{
 * 		description: 'Gists description',
 * 		'public': true,
 * 		files: {
 * 			'files-name.txt': {
 * 				content: 'Files content'
 * 			}
 * 		}
 * 	}
 * 
 * The public attribute must be wrapped in quotes because it is a reserved word in JavaScript
 * 
 * @param {Object} settings The settings in the layout described above
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.create = function(settings, callback) {
	return this.instance.get({
		urlTemplate: '/gists',
		method: 'POST',
		data: settings
	}, callback);
};

/**
 * Edits the specified gist
 * The settings object is the same one as used in the create method
 * 
 * 	{
 * 		description: 'Gists new description',
 * 		'public': true,
 * 		files: {
 * 			'files-new-name.txt': {
 * 				content: 'Files new content'
 * 			},
 * 			'old-file-to-delete.txt': {
 * 				content: null
 * 			}
 * 		}
 * 	}
 * 
 * The public attribute must be wrapped in quotes because it is a reserved word in JavaScript
 * To delete a file, pass null as its content
 * 
 * @param {Number} id The ID of the gist to edit
 * @param {Object} settings The settings in the layout described above
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.edit = function(id, settings, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}',
		urlData: {
			id: id
		},
		method: 'PATCH',
		data: settings
	}, callback);
};

/**
 * Deletes the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to delete
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.remove = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}',
		urlData: {
			id: id
		},
		method: 'DELETE'
	}, callback);
};

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

/**
 * Forks the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to fork
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.fork = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/fork',
		urlData: {
			id: id
		},
		method: 'POST'
	}, callback);
};

/**
 * Stars the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to star
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.star = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/star',
		urlData: {
			id: id
		},
		method: 'PUT'
	}, callback);
};

/**
 * Unstars the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to unstar
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.unstar = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/star',
		urlData: {
			id: id
		},
		method: 'DELETE'
	}, callback);
};

/**
 * Checks if the gist that matches the passed ID is starred
 * 
 * @param {Number} id The ID of the gist to check
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.prototype.starred = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/star',
		urlData: {
			id: id
		}
	}, callback);
};

// Register the API
GitHub.registerApi('gists', gistsApi);