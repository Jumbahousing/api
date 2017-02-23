'use strict';

module.exports = function(req, res, system) {
	const log = system.log;
	const User = system.storage.sequelize.User;

  return req.
	shouldHave({
		body: {
			'firstName': {
				type: 'string'
			},
			'lastName': {
				type: 'string'
			},
			'userName': {
				type: 'string'
			},
			'email': {
				type: 'string'
			},
			'password': {
				type: 'string'
			},
			'phone': {
				type: 'string',
				default: ''
			}
		}
	}).
	then(()=>
		User.create(req.body)
	).
	then((user)=>
		res.response.success(user, 'Created User Successfully')
	);
}
