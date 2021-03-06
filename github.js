/**
 * GitHub JavaScript API v0.0.2
 * https://github.com/Wolfy87/github.js
 */
(function(exports) {
	/**
	 * GitHub API v3 class
	 * 
	 * @param {Object} options List of options to pass to the class
	 */
	function GitHub(options) {
		// Initialise variables
		var i = null,
			ac = null;
		
		// Set any passed options
		this.setOptions(options);
		
		// Pass the instance into the API objects
		for(i in this) {
			if(this[i] instanceof GitHub.APIObject) {
				this[i].instance = this;
			}
		}
	}/**
 * Adds methods to the GitHub object
 * They are not added into the prototype so for use before initialisation
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the object, a function for example
 */
GitHub.extend = function(key, value) {
	// Add the passed value to the object
	this[key] = value;
};

/**
 * Add the implement method to the class
 * This is not added in the prototype because it is used during construction
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the prototype, a function for example
 */
GitHub.extend('implement', function(key, value) {
	// Add the passed value to the prototype
	this.prototype[key] = value;
});

/**
 * Base class to extend when adding API objects
 */
GitHub.extend('APIObject', function() {});/**
 * Stores options into the GitHub class instance
 * 
 * @param {Object} options Options to be set
 */
function setOptions(options) {
	// Initialise any required variables
	var i = null;
	
	// If there is no options object just use this one or a blank object
	if(!this.options) {
		this.options = options || {};
	}
	else {
		// So it does exist
		// We now loop over the properties merging the objects
		for(i in options) {
			if(options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}
	}
}

// Implement setOptions in the GitHub class
GitHub.implement('setOptions', setOptions);/**
 * HTTP request class
 * Makes HTTP requests easy
 * 
 * @param {Object} options List of options to pass to the class
 */
function HTTPRequest(options) {
	// Set the default options
	this.setOptions({
		method: 'GET',
		async: true,
		url: null,
		user: null,
		password: null,
		data: null
	});
	
	// Set the users passed options
	this.setOptions(options);
}

/**
 * Sets the requests options
 * 
 * @param {Object} options Your list of options
 */
HTTPRequest.prototype.setOptions = setOptions;

/**
 * Handles a requests response and status code
 * Will return either the response, true or false
 * 
 * @param {Object} request The request object
 * @returns {Mixed} Either the response text or a boolean
 */
HTTPRequest.prototype.handleStatus = function(request) {
	// Handle different status codes
	if(request.status >= 200 && request.status < 400) {
		// Return the data
		// If there is no data, return true
		if(request.responseText) {
			return request.responseText;
		}
		else {
			return true;
		}
	}
	else {
		// The request did not come back well
		// Return false back
		// This could be a gist starred check in which case a 404 means it is not starred
		return false;
	}
};

/**
 * Sends the HTTP request configured in the options object
 * 
 * @param {Function} callback The function to send the results to if asyncronous
 * @returns {String} The results will be returned if it is not an asyncronous request
 */
HTTPRequest.prototype.send = function(callback) {
	// Initialise the request
	var request = new XMLHttpRequest();
	request.open(this.options.method, this.options.url, this.options.async);
	
	// Authenticate if required
	if(this.options.user && this.options.password) {
		request.setRequestHeader('Authorization', 'Basic ' + btoa(this.options.user + ':' + this.options.password));
	}
	
	if(this.options.async && callback) {
		// Add the event listeners
		request.addEventListener('readystatechange', function() {
			// Check if the request is done
			if(request.readyState === 4) {
				// Send the response to the callback
				callback.call(null, this.handleStatus(request));
			}
		});
	}
	
	// Send the request
	request.send(JSON.stringify(this.options.data));
	
	// If it is not an async request, send back the results instantly
	if(!this.options.async) {
		return this.handleStatus(request);
	}
};/**
 * JSON request class
 * Allows you to load and parse JSON easily
 * Extends the HTTPRequest class
 * 
 * @param {Object} options List of options to pass to the class
 */
function JSONRequest(options) {
	// Set the users passed options
	HTTPRequest.call(this, options);
}

// Extend the HTTPRequest class
JSONRequest.prototype.setOptions = HTTPRequest.prototype.setOptions;
JSONRequest.prototype.handleStatus = HTTPRequest.prototype.handleStatus;

/**
 * Handles the response from a HTTP request
 * This expects JSON and will return the decoded JSON
 * 
 * @param {String} response The HTTP response in JSON
 * @returns {Mixed} The decoded JSON, usually an array or object
 */
JSONRequest.prototype.handleResponse = function(response) {
	// Make sure we have a response
	if(typeof response === 'string' && response) {
		// Decode and return the data
		return JSON.parse(response);
	}
	else {
		// Response is not a string, just return it
		return response;
	}
};

/**
 * Sends the HTTP request configured in the options object
 * Will decode the response as JSON
 * 
 * @param {Function} callback The function to send the results to if asyncronous
 * @returns {String} The results will be returned if it is not an asyncronous request
 */
JSONRequest.prototype.send = function(callback) {
	// Initialise variables
	var self = this;
	
	// Perform this differently depending on the async option
	if(this.options.async) {
		// Async, use a callback
		HTTPRequest.prototype.send.call(this, function(response) {
			// Decode the response and send it to the callback
			callback.call(null, self.handleResponse(response));
		});
	}
	else {
		// Non async, so we handle the returned data and pass it to the callback
		return self.handleResponse(HTTPRequest.prototype.send.call(this));
	}
};/**
 * GitHub API request class
 * Extends the JSONRequest class
 * 
 * @param {Object} options List of options to pass to the class
 */
function APIRequest(options) {
	// Set the default options
	this.setOptions({
		rootUrl: 'https://api.github.com',
		urlTemplate: null, // Ex: /gists/${gistId}/comments
		urlData: null // Ex: { gistId: 12345 }
	});
	
	// Set the users passed options
	JSONRequest.call(this, options);
}

// Extend the JSONRequest class
APIRequest.prototype.setOptions = JSONRequest.prototype.setOptions;
APIRequest.prototype.handleResponse = JSONRequest.prototype.handleResponse;
APIRequest.prototype.handleStatus = JSONRequest.prototype.handleStatus;

/**
 * Compiles the URL components sent in the options object
 * Stores them back into the options
 */
APIRequest.prototype.buildUrl = function() {
	// Initialise variables
	var built = this.options.rootUrl + this.options.urlTemplate,
		urlData = this.options.urlData,
		i = null;
	
	// Compile the template if there is data
	if(urlData) {
		for(i in urlData) {
			if(urlData.hasOwnProperty(i)) {
				built = built.replace('${' + i + '}', urlData[i]);
			}
		}
	}
	
	// Store the built URL
	this.setOptions({
		url: built
	});
};

/**
 * Sends the API request configured in the options object
 * 
 * @param {Function} callback The function to send the results to if asyncronous
 * @returns {String} The results will be returned if it is not an asyncronous request
 */
APIRequest.prototype.send = function(callback) {
	// Initialise variables
	var self = this;
	
	// Build the URL
	this.buildUrl();
	
	// Perform this differently depending on the async option
	if(this.options.async) {
		// Async, use a callback
		JSONRequest.prototype.send.call(this, function(response) {
			// Send the response to the callback
			callback.call(null, response);
		});
	}
	else {
		// Non async, return the result
		return JSONRequest.prototype.send.call(this);
	}
};GitHub.implement('authenticate', function(user, password) {
	// Store the passed user and password
	// It will be used when a request is made
	this.setOptions({
		user: user,
		password: password
	});
});

GitHub.implement('deAuthenticate', function() {
	// Clear the authentication
	this.setOptions({
		user: null,
		password: null
	});
});
/**
 * Makes a request using the APIRequest class
 * 
 * @param {Object} requestOptions Options object for the HTTPRequest
 * @param {Function} callback Where to pass the results to, optional
 * @returns {Mixed} The decoded JSON results from the request
 */
GitHub.implement('get', function(requestOptions, callback) {
	// Set up the request and initialise variables
	var apiOptions = this.options,
		request = new APIRequest({
			async: (callback) ? true : false
		});
	
	request.setOptions(requestOptions);
	
	if(apiOptions.user && apiOptions.password) {
		request.setOptions({
			user: apiOptions.user,
			password: apiOptions.password
		});
	}
	
	// Send the request
	if(callback) {
		request.send(callback);
	}
	else {
		return request.send();
	}
});// API class for interacting with GitHub gists
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
GitHub.implement('gists', gistsApi);// API class for interacting with Git data on GitHub
var gitDataApi = new GitHub.APIObject();

/**
 * Gets the content and encoding of a blob
 * 
 * @param {String} user The owner of the repository
 * @param {String} repo The repositories name
 * @param {String} sha The sha of the blob
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gitDataApi.getBlob = function(user, repo, sha, callback) {
	return this.instance.get({
		urlTemplate: '/repos/${user}/${repo}/git/blobs/${sha}',
		urlData: {
			user: user,
			repo: repo,
			sha: sha
		}
	}, callback);
};

/**
 * Creates a blob with your specified encoding and content
 * For some reason the returned base64 has line breaks, this means it cannot be decoded in the browser
 * To decode it, use this function. It will strip line breaks first. Just pass the blob object to it
 * 
 * 	function decodeBlob(blob) {
 * 		return atob(blob.content.replace(/\n/g, ''));
 * 	}
 * 
 * @param {String} user The owner of the repository
 * @param {String} repo The repositories name
 * @param {Object} settings An object containing your new blobs encoding and content 
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gitDataApi.createBlob = function(user, repo, settings, callback) {
	return this.instance.get({
		urlTemplate: '/repos/${user}/${repo}/git/blobs',
		urlData: {
			user: user,
			repo: repo
		},
		data: settings,
		method: 'POST'
	}, callback);
};

// Register the API
GitHub.implement('gitData', gitDataApi);	// Expose the class
	exports.GitHub = GitHub;
}(this));