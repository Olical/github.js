/**
 * GitHub JavaScript API v0.0.2
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
		
		// Pass the instance into the API objects
		for(i in this) {
			if(this[i] instanceof GitHub.APIObject) {
				this[i].instance = this;
			}
		}
	}