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
		// Set any passed options
		this.setOptions(options);
	}