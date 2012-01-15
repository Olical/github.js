# github.js

Frontend JavaScript library for interacting with the GitHub API v3.

# Dependencies

There are **no dependencies** in the front end. You must have [node.js](http://nodejs.org/), [UglifyJS](https://github.com/mishoo/UglifyJS) and [make](http://www.gnu.org/software/make/) to build the code. You can build the code by runnin `make` from your terminal.

# API support

My aim is to cover the **whole API**. This is the current status.

 * full - Gists
 * none - Git data
 * none - Issues
 * none - Organisations
 * none - Pull requests
 * none - Repositories
 * none - Users
 * none - Events

# Testing

The tests are pretty heavy. They should be run from inside the Chrome app or similar method to allow XHR. Please create `./test/auth.js` containing your GitHub login details before running. It should look like this.

	var user = 'USERNAME',
		password = 'PASSWORD';

When you are all set up, just load `./test/index.html` to run the automated tests.

Testing is currently only performed in modern browsers such as Google Chrome and Firefox. Older browser support will come later.

# Licence

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">github.js</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://olivercaldwell.co.uk/" property="cc:attributionName" rel="cc:attributionURL">Oliver Caldwell</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.