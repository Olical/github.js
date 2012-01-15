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

// Set up the API class storage array
GitHub.prototype.apiClasses = [];

/**
 * Registers an API to be loaded on instance creation
 * 
 * @param {String} key The key to store it under
 * @param {Function} apiClass Class to store the instance of
 */
GitHub.registerApi = function(key, apiClass) {
	// Register the API
	this.prototype.apiClasses.push({
		key: key,
		apiClass: apiClass
	});
};