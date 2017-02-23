'use strict';
const moment = require('moment');
const bcrypt = require('bcryptjs');

module.exports = {
	name: 'Session',
	schema: (dataTypes) => ({
		key: {
			type: dataTypes.STRING(255),
			set: function(val){
				let key = val + '-' + Math.random().toString(36).substr(3,10) + '-' + Date.now();
				this.setDataValue('key', bcrypt.hashSync(key,1) );
			}
		},
		expired: {
			type: dataTypes.BOOLEAN(),
			defaultValue: false,
			get: ()=>{
				return moment().diff(moment(this.update_at),'hours') > 2;
			}
		}
	}),
	associate: function(Session, models) {
		Session.belongsTo(models.User);
	},
	options: {
		paranoid: true,//set true to never delete anything
		instanceMethods: require('./instanceMethods'),
		classMethods: require('./classMethods'),
		getterMethods: require('./getterMethods'),
		setterMethods: require('./setterMethods')
	},
}
