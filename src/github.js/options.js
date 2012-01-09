define(['api'], function() {
	/**
	 * Stores options into the GitHub class instance
	 * 
	 * @param {Object} options Options to be set
	 */
	GitHub.implement('setOptions', function(options) {
		// Initialise any required variables
		var i = null;
		
		// If there is no options object just use this one or a blank object
		if(!this.options) {
			this.options = options || {};
		}
		else {
			// So it does exist
			// We now loop over the properties merging the objects
			for(i in options) {
				if(options.hasOwnProperty(i)) {
					this.options[i] = options[i];
				}
			}
		}
	});
});