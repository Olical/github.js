GitHub.implement('gists', {
	getFromUser: function(user, callback) {
		return this.get({
			urlTemplate: '/users/${user}/gists',
			urlData: {
				user: user
			}
		}, callback);
	}
});