// API class for interacting with GitHub gists
var gistsApi = new GitHub.APIObject();

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
gistsApi.create = function(settings, callback) {
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
gistsApi.edit = function(id, settings, callback) {
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
gistsApi.remove = function(id, callback) {
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
gistsApi.get = function(callback) {
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
gistsApi.getPublic = function(callback) {
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
gistsApi.getStarred = function(callback) {
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
gistsApi.getFromUser = function(user, callback) {
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
gistsApi.getById = function(id, callback) {
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
gistsApi.fork = function(id, callback) {
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
gistsApi.star = function(id, callback) {
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
gistsApi.unstar = function(id, callback) {
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
gistsApi.starred = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/star',
		urlData: {
			id: id
		}
	}, callback);
};

/**
 * Gets comments for a gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to get comments from
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.getComments = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/comments',
		urlData: {
			id: id
		}
	}, callback);
};

/**
 * Gets a comment from a gist
 * 
 * @param {Number} id The ID of the comment to get
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.getComment = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/comments/${id}',
		urlData: {
			id: id
		}
	}, callback);
};

/**
 * Adds a comment to the gist that matches the passed ID
 * 
 * @param {Number} id The ID of the gist to comment on
 * @param {String} content The content of your comment
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.comment = function(id, content, callback) {
	return this.instance.get({
		urlTemplate: '/gists/${id}/comments',
		urlData: {
			id: id
		},
		data: {
			body: content
		},
		method: 'POST'
	}, callback);
};

/**
 * Edits a comment from a gist
 * 
 * @param {Number} id The ID of the comment to edit
 * @param {String} content The new content of your comment
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.editComment = function(id, content, callback) {
	return this.instance.get({
		urlTemplate: '/gists/comments/${id}',
		urlData: {
			id: id
		},
		data: {
			body: content
		},
		method: 'PATCH'
	}, callback);
};

/**
 * Deletes a comment from a gist
 * 
 * @param {Number} id The ID of the comment to delete
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gistsApi.removeComment = function(id, callback) {
	return this.instance.get({
		urlTemplate: '/gists/comments/${id}',
		urlData: {
			id: id
		},
		method: 'DELETE'
	}, callback);
};

// Register the API
GitHub.implement('gists', gistsApi);