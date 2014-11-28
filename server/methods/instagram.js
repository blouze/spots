instagram = {

	client: null,

	initialize: function() {
		console.log("[+] Initializing Instagram...");
		instagram.client = new Instagram.createClient('ad05b630c4954c8d973b8863efd9c1d5', '552c3421e84d44a0889e02187864d79a');
	},

	tagMedia: function (tag, cb) {
		if (!instagram.client)
			instagram.initialize();
		console.log("[+] Instagram tagMedia... " + tag);

		instagram.client.tags.media(tag, function (result, error) {
		//instagram.client.tags.media("SUPRA", function (result, error) {
			instagram.return(result, error, cb);
		});
	},

	usersId: function (id, cb) {
		if (!instagram.client)
			instagram.initialize();
		console.log("[+] Instagram usersId...");

		instagram.client.users.id(id, function (result, error) {
			instagram.return(result, error, cb);
		});
	},

	mediaRecent: function (id, cb) {
		if (!instagram.client)
			instagram.initialize();
		console.log("[+] Instagram mediaRecent...");

		instagram.client.users.media(id, function (result, error) {
			instagram.return(result, error, cb);
		});
	},

	return: function (result, error, cb) {
		if (error)
			cb && cb(error);
		cb && cb(null, result);
	}
}

Meteor.methods({
	instagramUserMedia: function () {
		console.log("instagramUserMedia");
		var syncFunc = Meteor.wrapAsync(instagram.mediaRecent);
		var ids = ["144327057", "10031821", "4462316"]
		var index = Math.floor(Math.random() * ids.length);
		var result = syncFunc(ids[index]);
		//var result = syncFunc("10031821");
		return result;
	},
	instagramTagMedia: function (tag) {
		var syncFunc = Meteor.wrapAsync(instagram.tagMedia);
		var result = syncFunc(tag);
		return result;
	}
});