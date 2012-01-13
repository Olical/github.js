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
});