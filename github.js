(function(exports) {
	// Initialise the class
	function GitHub(options) {
		// Set any passed options
		this.setOptions(options);
	}/**
 * Add the implement method to the class
 * This is not added in the prototype because it is used during construction
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the prototype, a function for example
 */
GitHub.implement = function(key, value) {
	// Add the passed value to the prototype
	this.prototype[key] = value;
};/**
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
});	// Espose the class
	exports.GitHub = GitHub;
}(this));