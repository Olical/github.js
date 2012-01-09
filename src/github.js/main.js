(function(exports) {
	// Initialise the class
	function GitHub(options) {
		// Set any passed options
		this.setOptions(options);
	}
	
	// Expose the class
	exports.GitHub = GitHub;
	
	// Load main modules
	require(['options', 'api']);
}(this));