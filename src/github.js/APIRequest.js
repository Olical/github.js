/**
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
APIRequest.prototype = JSONRequest.prototype;

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
};