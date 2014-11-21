Meteor.methods({
	uploadPhotoToImgur: function (image) {
		Future = Npm.require('fibers/future');
		var myFuture = new Future();
		Imgur.upload({
			apiKey: "e5eb24c37ccf5ae",
			image: image
		}, function (err, data) {
			if (err)
				myFuture.throw(err);
			else
				myFuture.return(data);
		});
		return myFuture.wait();
	},
	createSpot: function (doc, imgur) {
		//check(doc, Schema.Spots);
		console.log(imgur);
		this.unblock();
		return false;
		Imgur.upload({
			apiKey: "e5eb24c37ccf5ae",
			image: image
		}, function (err, data) {
			if (err)
				myFuture.throw(err);
			else
				promise.result(doc);
		});
	}
});