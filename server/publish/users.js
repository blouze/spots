Meteor.publish("user", function (userId) {
	return [
	Meteor.users.find({_id: userId}, {}),
	Spots.find({createdBy: userId}, {sort: {createdAt: -1}})
	];
});