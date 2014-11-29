Template.userProfile.helpers({
	screenName: function () {
		if (this.profile)
			return this.profile.name;
		else
			return this.username;
	},
	picture: function () {
		if (this.services && this.services.instagram)
			return this.services.instagram.profile_picture;
	},
	spots: function () {
		return Spots.find({createdBy: this._id}, {sort: {createdAt: -1}})
	},
	isCurrentUser: function () {
		return Meteor.userId() === this._id;
	}
});