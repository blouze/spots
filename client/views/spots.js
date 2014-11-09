Template.spotsList.helpers({
	spots: function () {
		return Spots.find();
	}
});

Template.newSpot.rendered = function () {
	navigator.geolocation.getCurrentPosition(function (position) {
		alert('Latitude: '          + position.coords.latitude          + '\n' +
			'Longitude: '         + position.coords.longitude         + '\n' +
			'Altitude: '          + position.coords.altitude          + '\n' +
			'Accuracy: '          + position.coords.accuracy          + '\n' +
			'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			'Heading: '           + position.coords.heading           + '\n' +
			'Speed: '             + position.coords.speed             + '\n' +
			'Timestamp: '         + position.timestamp                + '\n');
	}, function (err) {
		alert('code: '    + err.code    + '\n' +
			'message: ' + err.message + '\n');
	});
};

Template.newSpot.helpers({
	spotPhotoSrc: function () {
		return Session.get("spotPhoto");
	}
});

Template.newSpot.events({
	'click button#cameraBtn': function () {
		MeteorCamera.getPicture({}, function (err, data) {
			if (!err)
				Session.set("spotPhoto", data);
			else
				console.log(err.message);
		});
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