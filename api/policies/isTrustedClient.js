/**
 * isTrustedClient policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

	var grantType = req.param('grant_type');

	if ( ! grantType )
		return res.send(400, 'Missing grant_type parameter');

	// Handle password and authorization code grant type
	switch ( grantType ) {

		case 'password':
			// Make sure client_id is provided
			var clientId = req.param('client_id');

			if ( ! clientId )
				return res.send(400, 'Missing client_id parameter');

			// Make sure client is trusted
			Client.findOne({
				clientId: clientId
			},
				function(err, client){
					if ( err )
						return res.send(500, err.message);
					if ( client.trusted )
						return next();

					return res.send(401, 'resource owner password flow is not allowed');
				}
			);
		break;

		case 'authorization_code':
			return next();
		break;

		case 'refresh_token':
			return next();
		break;

	}

};