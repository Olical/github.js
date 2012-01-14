test('Gists', function() {
	var client = new GitHub();
	
	// Normal calls
	equals(client.gists.getFromUser('Wolfy87')[0].user.login, 'Wolfy87', 'Getting a users gists');
	equals(client.gists.get().length, 30, 'Getting all public gists, would be the users gists if authenticated');
	equals(client.gists.getPublic().length, 30, 'Getting all public gists using the full URL');
	equals(client.gists.getById(1).description, 'the meaning of gist', 'Getting a gist by ID');
	
	// Authenticated calls
	client.authenticate(user, password);
	equals(typeof client.gists.getStarred().length, 'number', 'Getting the authenticated users starred gists');
	equals(typeof client.gists.get().length, 'number', 'Getting the authenticated users gists');
	equals(client.gists.create({
		description: 'API test',
		'public': false,
		files: {
			'file1.txt': {
				content: 'Hello, World!'
			}
		}
	}).description, 'API test', 'Creating a gist');
});