GitHub.implement('authenticate', function(user, password) {
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
