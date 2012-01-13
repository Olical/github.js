GitHub.implement('gists', {
	getFromUser: function(user, callback) {
		var request = new APIRequest({
			urlTemplate: '/users/${user}/gists',
			urlData: {
				user: user
			},
			async: (callback) ? true : false
		});
		
		if(callback) {
			request.send(callback);
		}
		else {
			return request.send();
		}
	}
});