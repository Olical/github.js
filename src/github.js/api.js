(function() {
	/**
	 * Add the implement method to the class
	 * This is not added in the prototype because it is used during construction
	 * 
	 * @param {String} key Name to place the value under
	 * @param {Mixed} value Variable to insert into the prototype, a function for example
	 */
	GitHub.implement = function(key, value) {
		// Add the passed value to the prototype
		this.prototype[key] = value;
	};
}());