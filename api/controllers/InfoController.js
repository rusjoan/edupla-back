module.exports = {

	index: function(req,res)
	{
		res.json({
			"msg": "if you see this you successfully went through OAuth2 authorization process"
		});
	},  

	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to InfoController)
	 */
	_config: {}

	
};