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
		// Initialise variables
		var i = null,
			ac = null;
		
		// Set any passed options
		this.setOptions(options);
		
		// Initialise the API classes
		for(i = 0; i < this.apiClasses.length; i += 1) {
			ac = this.apiClasses[i];
			
			// Load the class
			this[ac.key] = new ac.apiClass;
			
			// Pass the instance to it
			this[ac.key].instance = this;
		}
	}