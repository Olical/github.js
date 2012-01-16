/**
 * Adds methods to the GitHub object
 * They are not added into the prototype so for use before initialisation
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the object, a function for example
 */
GitHub.extend = function(key, value) {
	// Add the passed value to the object
	this[key] = value;
};

/**
 * Add the implement method to the class
 * This is not added in the prototype because it is used during construction
 * 
 * @param {String} key Name to place the value under
 * @param {Mixed} value Variable to insert into the prototype, a function for example
 */
GitHub.extend('implement', function(key, value) {
	// Add the passed value to the prototype
	this.prototype[key] = value;
});

/**
 * Base class to extend when adding API objects
 */
GitHub.extend('APIObject', function() {});