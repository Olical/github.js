define(function() {
	// Initialise the class
	function GitHub(options) {
		// Set any passed options
		this.setOptions(options);
	}
	
	// Load main modules
	require(['options']);
	
	// Expose the class
	window.GitHub = GitHub;
});