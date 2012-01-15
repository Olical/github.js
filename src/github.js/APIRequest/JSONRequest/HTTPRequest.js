/**
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
};