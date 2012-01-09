define(['api'], function() {
	/**
	 * Stores options into the GitHub class instance
	 * 
	 * @param {Object} options Options to be set
	 */
	GitHub.implement('setOptions', function(options) {
		// If there is no options object just use this one or a blank object
		if(!this.options) {
			this.options = options || {};
		}
	});
});