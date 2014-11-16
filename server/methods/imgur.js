Meteor.methods({
	uploadPhotoToImgur: function (image) {
		console.log(image);
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
	}
});