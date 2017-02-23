'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	name: 'User',
	schema: (dataTypes) => ({
		userName: {
			type: dataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [4, 20],
			},
			unique: true
		},
		password: {
			type: dataTypes.STRING(255),
			allowNull: false,
			set: function(val) {
				let salt = this.getDataValue('salt');
				if(!salt){
					salt = Math.random().toString(56).substr(2,10);
					this.setDataValue('salt', salt);
				}
				let saltedPassword = salt + val + salt;
				this.setDataValue('password', bcrypt.hashSync(saltedPassword, bcrypt.genSaltSync()));
			}
		},
		firstName: {
			type: dataTypes.STRING(100),
			allowNull: false
		},
		lastName: {
			type: dataTypes.STRING(100),
			allowNull: false
		},
		email: {
			type: dataTypes.STRING(100),
			allowNull: true,
			validate: {
				isEmail: true
			}
		},
		phone: {
			type: dataTypes.STRING,
			allowNull: true
		},
		salt: {
			type: dataTypes.STRING(100),
			defaultValue: ()=>{
				return Math.random().toString(26).substr(2,10);
			}
		}
	}),
	associate: function(User, models) {
		User.hasMany(models.Session);
	},
	options: {
		paranoid: true,//set true to never delete anything
		instanceMethods: require('./instanceMethods'),
		classMethods: require('./classMethods'),
		getterMethods: require('./getterMethods'),
		setterMethods: require('./setterMethods')
	}
}
