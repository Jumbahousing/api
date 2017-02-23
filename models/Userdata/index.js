'use strict';
module.exports = {
	name: 'Userdata',
	schema: (dataTypes) => ({

	}),
	associate: function(Userdata, models) {

	},
	options: {
		paranoid: true,//set true to never delete anything
		instanceMethods: require('./instanceMethods'),
		classMethods: require('./classMethods'),
		getterMethods: require('./getterMethods'),
		setterMethods: require('./setterMethods')
	},
}
