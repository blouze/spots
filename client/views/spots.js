Template.spotsList.helpers({
	spots: function () {
		return Spots.find();
	}
});

Template.spotItem.helpers({
	pictureThumbnail: function () {
		return Imgur.toThumbnail(this.picture, Imgur.SMALL_SQUARE);
	}
});

Template.newSpot.helpers({
	userLocation: function () {
		var userLocation = Session.get("userLocation");
		if (userLocation) {
			return userLocation.coords.latitude + ", " + userLocation.coords.longitude;
		}
	},
	uploadPhotoFormSchema: function() {
		return Schema.uploadPhoto;
	}
});

Template.newSpot.rendered = function () {
	navigator.geolocation.getCurrentPosition(function (position) {
		Session.set("userLocation", position);
	}, function (err) {
		console.log(
			'code: '    + err.code    + '\n' +
			'message: ' + err.message + '\n');
	},{
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	});
	Session.set("spotPhoto", null);
};

Template.newSpot.helpers({
	spotPhotoSrc: function () {
		return Session.get("spotPhoto");
	}
});

Template.newSpot.events({
	'click button#cameraBtn': function () {
		MeteorCamera.getPicture({}, function (err, data) {
			if (!err) {
				Meteor.call("uploadPhotoToImgur", data, function (error, result) {
					if (!error)
						Session.set("spotPhoto", result.link);
					else
						console.log(error.message);
				});
			}
			else
				console.log(err.message);
		});
	}
});

Template.editSpot.events({
	'click button#deleteSpot': function () {
		if (confirm("Are you sure you want to delete '" + this.name + "'?")) {
			Spots.remove(this._id, function (err) {
				if (!err)
					Router.go("home");
			});
		}
	}
});

AutoForm.addHooks(['insertSpotForm', 'updateSpotForm'], {
	// Called when any operation succeeds, where operation will be
	// "insert", "update", or the method name.
	onSuccess: function(operation, result, template) {
		if (operation === "insert")
			Router.go("home");
		else if (operation === "update")
			Router.go("viewSpot", {_id: template.data.doc._id});
	},
	// Called when any operation fails, where operation will be
	// "validation", "insert", "update", or the method name.
	onError: function(operation, error, template) {
		console.log(error);
	}
});