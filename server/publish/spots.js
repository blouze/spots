Meteor.publish(null, function () {
	return Spots.find({}, {sort: {createdBy: -1}});
});