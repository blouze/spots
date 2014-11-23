Template.spotsList.helpers({
	spots: function () {
		return Spots.find({}, {sort: {createdAt: -1}});
	}
});

Template.spotItem.helpers({
	pictureThumbnail: function () {
		return Imgur.toThumbnail(this.picture, Imgur.SMALL_SQUARE);
	}
});



Template.viewSpot.helpers({
	pictureSquare: function () {
		if (this.picture)
			return Imgur.toThumbnail(this.picture, Imgur.BIG_SQUARE);
	},
	spotPosition: function () {
		if (this.location) {
			var coords = {
				longitude: this.location[0],
				latitude: this.location[1]
			};
			Meteor.setTimeout(function () {
				gmaps.setCenter(coords);
				gmaps.addMarker(coords);
			}, 500);
			return coords;
		}
	},
	hashtag: function () {
		return "#SpotON_" + this._id;
	},
	clipboardClicked: function () {
		return Session.get("clipboardClicked");
	},
	instagramMedia: function () {
		//console.log(Session.get("instagramMedia"));
		return Session.get("instagramMedia");
	}
});

Template.viewSpot.rendered = function () {
	Meteor.call('instagramMedia', {}, function (err, result) {
		if (err)
			console.log(err);
		Session.set("instagramMedia", result);
	});
	Session.set("instagramMedia", null);
	Session.set("clipboardClicked", false);
};

Template.viewSpot.events({
	'click button#clipBoardBtn': function () {
		if (Meteor.isCordova){
			cordova.plugins.clipboard.copy("#SpotON_" + this._id);
			Session.set("clipboardClicked", true);
		}
	}
});



Template.instagramItem.helpers({
	createdAt: function () {
		return moment.unix(this.created_time);
	},
	isVideo: function () {
		return this.type == "video";
	}
});



Template.newSpot.rendered = function () {
	navigator.geolocation.getCurrentPosition(function (position) {
		Session.set("userPosition", position);
	}, function (err) {
		console.log(
			'code: '    + err.code    + '\n' +
			'message: ' + err.message + '\n');
	},{
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	});
	Session.set("userPosition", null);
	Session.set("imgurUpload", null);
};

Template.newSpot.helpers({
	spotPhotoSrc: function () {
		var imgurUpload = Session.get("imgurUpload");
		if (imgurUpload)
			return imgurUpload.image;
	},
	userPosition: function () {
		var position = Session.get("userPosition");
		if (position) {
			gmaps.setCenter(position.coords);
			gmaps.addMarker(position.coords);
			return position.coords;
		}
	}
});

Template.newSpot.events({
	'click button#cameraBtn': function () {
		if (Meteor.isCordova)
			MeteorCamera.getPicture({}, function (err, data) {
				if (!err) {
					Session.set("imgurUpload", {
						type: "base64",
						image: data
					});
				}
				else
					console.log(err.message);
			});
		else
			Session.set("imgurUpload", {
				type: "URL",
				image: "http://goskateboardingday.le-site-du-skateboard.com/files/2011/05/module-palais-tokyo-skatepark-dome.JPG"
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


AutoForm.addHooks('insertSpotForm', {
	before: {
		insert: function (doc, template) {

			var userPosition = Session.get("userPosition");
			if (userPosition)
				doc.location = [userPosition.coords.longitude, userPosition.coords.latitude];

			var imgurUpload = Session.get("imgurUpload");
			if (imgurUpload) {
				var ref = this;
				imgurUpload.apiKey = "e5eb24c37ccf5ae";
				Imgur.upload(imgurUpload, function (err, data) {
					if (err)
						console.log(err.message);
					else {
						console.log(data);
						doc.picture = data.link;
						return ref.result(doc);
					}
				});
			}
			else
				return this.result(doc);
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

//AutoForm.debug();