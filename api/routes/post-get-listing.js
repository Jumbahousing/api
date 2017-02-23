'use strict';

module.exports = (req, res, system) => {
	const log = system.log;
	const auth = system.import_service('auth');
	const Listing = system.storage.sequelize.Listing;

	return auth(req,res).
	then(()=>
		Listing.find({
			where: {
				id: {
					gte: 0
				}
			}
		})
	)
	then((data) =>
		res.response.success(data,'Good!')
	);
}
