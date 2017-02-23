'use strict';
module.exports = {
	name: 'Listing',
	schema: (dataTypes) => ({
		name: {
			type: dataTypes.STRING(155)
		},
		location: {
			type: dataTypes.STRING(255)
		}
	}),
	associate: function(Listing, models) {

	},
	options: {
		paranoid: true,//set true to never delete anything
		instanceMethods: require('./instanceMethods'),
		classMethods: require('./classMethods'),
		getterMethods: require('./getterMethods'),
		setterMethods: require('./setterMethods')
	},
}
