/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

	autoPK: false,

	attributes: {
		id: {
			primaryKey: true, type: 'integer', unique: true, autoIncrement: true, defaulsTo: 1
		},
		firstName: {
			type: 'string', required: true, notEmpty: true
		},
		lastName: {
			type: 'string', required: true, notEmpty: true
		},
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},
		role: {
			type: 'string',
			enum: ['superadmin', 'admin', 'curator', 'student'],
			defaultsTo: 'student'
		},
		email: {
			type: 'email',
			required: true,
			unique: true,
			index: true
		},
		hashedPassword: 'string',
		phone: {
			type: 'string',
			regex: /[+]\d{11,15}/
		},

		// Override toJSON method to remove password from API
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		}
	},

	beforeValidate: function(userRecord, next) {
		if ( userRecord.fullName != '' ) {
			userRecord.firstName = userRecord.fullName.split(' ')[0];
			userRecord.lastName = userRecord.fullName.split(' ')[1];
			userRecord.fullName = '';
		}
		next();
	},

	beforeCreate: function(values, next) {
		bcrypt.hash(values.password, 10, function(err, hash) {
			if (err) return next(err);
			values.hashedPassword = hash;
			delete values.password;
			next();
		});
	}
};