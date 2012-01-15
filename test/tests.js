test('Gists', function() {
	var client = new GitHub(),
		result = null;
	
	// Normal calls
	equals(client.gists.getFromUser('Wolfy87')[0].user.login, 'Wolfy87', 'Getting a users gists');
	equals(client.gists.get().length, 30, 'Getting all public gists, would be the users gists if authenticated');
	equals(client.gists.getPublic().length, 30, 'Getting all public gists using the full URL');
	equals(client.gists.getById(1).description, 'the meaning of gist', 'Getting a gist by ID');
	
	// Authenticated calls
	client.authenticate(user, password);
	equals(typeof client.gists.getStarred().length, 'number', 'Getting the authenticated users starred gists');
	equals(typeof client.gists.get().length, 'number', 'Getting the authenticated users gists');
	
	result = client.gists.create({
		description: 'API test',
		'public': false,
		files: {
			'file1.txt': {
				content: 'Hello, World!'
			}
		}
	});
	
	equals(result.description, 'API test', 'Creating a gist');
	equals(client.gists.edit(result.id, {
		description: 'API test - edited'
	}).description, 'API test - edited', 'Editing a gist');
	equals(client.gists.starred(result.id), false, 'Checking an unstarred gist for a star');
	equals(client.gists.star(result.id), true, 'Starring a gist');
	equals(client.gists.starred(result.id), true, 'Checking an starred gist for a star');
	equals(client.gists.comment(result.id, 'Comment test').body, 'Comment test', 'Adding a comment');
	
	comments = client.gists.getComments(result.id);
	
	equals(comments[0].body, 'Comment test', 'Getting all comments');
	equals(client.gists.editComment(comments[0].id, 'Comment test - edited').body, 'Comment test - edited', 'Editing a comment');
	equals(client.gists.getComment(comments[0].id).body, 'Comment test - edited', 'Getting a single comment');
	equals(client.gists.removeComment(comments[0].id), true, 'Deleting a comment');
	equals(client.gists.remove(result.id), true, 'Deleting a gist');
});