// API class for interacting with Git data on GitHub
var gitDataApi = new GitHub.APIObject();

/**
 * Gets the content and encoding of a blob
 * 
 * @param {String} user The owner of the repository
 * @param {String} repo The repositories name
 * @param {String} sha The sha of the blob
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gitDataApi.getBlob = function(user, repo, sha, callback) {
	return this.instance.get({
		urlTemplate: '/repos/${user}/${repo}/git/blobs/${sha}',
		urlData: {
			user: user,
			repo: repo,
			sha: sha
		}
	}, callback);
};

/**
 * Creates a blob with your specified encoding and content
 * For some reason the returned base64 has line breaks, this means it cannot be decoded in the browser
 * To decode it, use this function. It will strip line breaks first. Just pass the blob object to it
 * 
 * 	function decodeBlob(blob) {
 * 		return atob(blob.content.replace(/\n/g, ''));
 * 	}
 * 
 * @param {String} user The owner of the repository
 * @param {String} repo The repositories name
 * @param {Object} settings An object containing your new blobs encoding and content 
 * @param {Function} callback If passed it will be come an async request. Results will be passed to this
 * @returns {Mixed} The decoded JSON response if you did not pass a callback
 */
gitDataApi.createBlob = function(user, repo, settings, callback) {
	return this.instance.get({
		urlTemplate: '/repos/${user}/${repo}/git/blobs',
		urlData: {
			user: user,
			repo: repo
		},
		data: settings,
		method: 'POST'
	}, callback);
};

// Register the API
GitHub.implement('gitData', gitDataApi);