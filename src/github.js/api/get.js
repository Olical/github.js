/**
 * Makes a request using the APIRequest class
 * 
 * @param {Object} requestOptions Options object for the HTTPRequest
 * @param {Object} apiObject Options that are indirectly passed to the HTTPRequest, should contain user and password if required
 * @param {Function} callback Where to pass the results to, optional
 * @returns {Mixed} The decoded JSON results from the request
 */
GitHub.implement('get', function(requestOptions, apiOptions, callback) {
	// Set up the request
	var request = new APIRequest({
		async: (callback) ? true : false
	});
	
	request.setOptions(requestOptions);
	
	if(apiOptions.user && apiOptions.password) {
		request.setOptions({
			user: apiOptions.user,
			password: apiOptions.password
		});
	}
	
	if(callback) {
		request.send(callback);
	}
	else {
		return request.send();
	}
});