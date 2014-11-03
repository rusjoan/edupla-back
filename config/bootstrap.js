/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

	User.findOne({ email: 'me@gmail.com' }, function(err, user){
		if ( ! user ) {
			User.create({
				fullName: 'Evgeny Murashkin',
				email: 'me@gmail.com',
				password: 'password'
			}).exec(function(err, user){
				if (err) {
					console.log(err);
					return;
				}
				console.log("Default user created");
				console.log("- username: " + user.email);
				console.log("- password: password");
			})
		} else {
			console.log("Default user already exists");
			console.log("- username: " + user.email);
			console.log("- password: password");
		}
	})

	Client.findOne({ 'name': 'trustedTestClient' }, function(err, client){
		if ( err ) {
			console.log(err.message);
			return;
		}

		if ( ! client ) {
			Client.create({
				name: 'trustedTestClient',
				redirectURI: 'http://localhost:1388',
				trusted: true
			}).exec(function(err, client){
				if ( err ) {
					console.log(err.message);
					return;
				}
				console.log("trustedTestClient created");
				console.log("- client_id: " + client.clientId);
				console.log("- client_secret: " + client.clientSecret);
				console.log("- redirectURI: " + client.redirectURI);
			})
		} else {
			console.log('trustedTestClient already exists');
			console.log("- client_id: " + client.clientId);
			console.log("- client_secret: " + client.clientSecret);
			console.log("- redirectURI: " + client.redirectURI);
		}
	})

	// Create an untrusted application
	Client.findOne({'name': 'untrustedTestClient'}, function(err, client){
		if ( err ) {
			console.log(err.message);
			return;
		}

		if ( ! client ) {
			Client.create({
				name: 'untrustedTestClient',
				redirectURI: 'http://localhost:1339'
			}).exec(function(err, client){
				if ( err ) {
					console.log(err.message);
					return;
				}
				console.log("untrustedTestClient created");
				console.log("- client_id: " + client.clientId);
				console.log("- client_secret: " + client.clientSecret);
				console.log("- redirectURI: " + client.redirectURI);
			})
		} else {
			console.log('untrustedTestClient already exists');
			console.log("- client_id: " + client.clientId);
			console.log("- client_secret: " + client.clientSecret);
			console.log("- redirectURI: " + client.redirectURI);
		}
	})

	// It's very important to trigger this callback method when you are finished
	// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	cb();
};
