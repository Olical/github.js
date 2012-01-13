/**
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
		return self.handleResponse(HTTPRequest.prototype.send.call(this));
	}
};