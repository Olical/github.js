(function() {
	// Wait until the API module has loaded
	require(['api'], function() {
		// Add the setOptions method to the class
		GitHub.implement('setOptions', function(options) {
			console.log(options);
		});
	});
}());