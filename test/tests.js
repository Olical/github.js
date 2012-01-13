test('Gists', function() {
	var client = new GitHub();
	equals(client.gists.getFromUser('Wolfy87')[0].user.login, 'Wolfy87', 'Getting a users gists');
	equals(client.gists.get().length, 30, 'Getting all public gists, would be the users gists if authenticated');
});