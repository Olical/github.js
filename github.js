/**
 * GitHub JavaScript API v0.0.0
 * https://github.com/Wolfy87/github.js
 */
(function(exports) {
	/**
	 * GitHub API v3 class
	 * 
	 * @param {Object} options List of options to pass to the class
	 */
	function GitHub(options) {
		// Set any passed options
		this.setOptions(options);
	}/**
 * Add the implement method to the class
 * This is not added in the prototype because it is used during construction
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the prototype, a function for example
 */
GitHub.implement = function(key, value) {
	// Add the passed value to the prototype
	this.prototype[key] = value;
};/**
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
 * Sends the HTTP request configured in the options object
 * 
 * @param {Function} callback The function to send the results to if asyncronous
 * @returns {String} The results will be returned if it is not an asyncronous request
 */
HTTPRequest.prototype.send = function(callback) {
	// TODO Implement authorisation
	// Initialise the request
	var request = new XMLHttpRequest();
	request.open(this.options.method, this.options.url, this.options.async);
	
	if(this.options.async && callback) {
		// Add the event listeners
		request.addEventListener('readystatechange', function() {
			// Check if the request is done
			if(request.readyState === 4 && request.status === 200) {
				// It is, send the data to the callback
				callback.call(null, request.responseText);
			}
		});
	}
	
	// Send the request
	request.send(this.options.data);
	
	// If it is not an async request, send back the results instantly
	if(!this.options.async) {
		return request.responseText;
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

/**
 * Handles the response from a HTTP request
 * This expects JSON and will return the decoded JSON
 * 
 * @param {String} response The HTTP response in JSON
 * @returns {Mixed} The decoded JSON, usually an array or object
 */
JSONRequest.prototype.handleResponse = function(response) {
	// Decode and return the data
	return JSON.parse(response);
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
		return HTTPRequest.prototype.send.call(this);
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
};GitHub.implement('gists', {
	getGists: function(user, callback) {
		var request = new APIRequest({
			urlTemplate: '/users/${user}/gists',
			urlData: {
				user: user
			},
			async: (callback) ? true : false
		});
		
		if(callback) {
			request.send(callback);
		}
		else {
			return request.send();
		}
	}
});
	// Expose the class
	exports.GitHub = GitHub;
}(this));