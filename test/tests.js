test('Gists', function() {
	var client = new GitHub();
	
	equals(client.gists.getFromUser('Wolfy87')[0].user.login, 'Wolfy87', 'Getting a users gists');
});