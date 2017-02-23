'use strict';

module.exports = function(req, res, system) {
	const User = system.storage.sequelize.User;

	return req.shouldHave({
		body: {
			userName: {
				type: 'string'
			},
			password: {
				type: 'string'
			}
		}
	}).
	then(()=>
		User.login(res, req.body.userName , req.body.password)
	);

}
