Meteor.publish(null, function () {
	return Spots.find({}, {sort: {createdAt: -1}});
});