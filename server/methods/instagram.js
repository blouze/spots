instagram = {

	endpoint: "https://api.instagram.com/v1/",
	client_id: null,
	client_secret: null,

	initialize: function(client_id, client_secret) {
		console.log("[+] Initializing Instagram...");
		this.client_id = client_id;
		this.client_secret = client_secret;
	},

	fetch: function (path, params, cb) {
		if (!this.client_id)
			this.initialize(Meteor.settings.instagram.client_id, Meteor.settings.instagram.client_secret);
		console.log("[+] Instagram fetch..." + this.endpoint + path);

		params.client_id = this.client_id;
		HTTP.call("GET", this.endpoint + path, {
			params: params
		}, function (error, result) {
			instagram.return(cb, result, error);
		});
	},

	return: function (cb, result, error) {
		if (error)
			cb && cb(error);
		cb && cb(null, result.data.data);
	},

	tagMedia: function (tag, cb) {
		instagram.fetch("tags/" + tag + "/media/recent/", {}, cb);
	},

	userMedia: function (id, cb) {
		instagram.fetch("users/" + id + "/media/recent/", {}, cb);
	}
}

Meteor.methods({
	instagramUserMedia: function () {
		console.log("instagramUserMedia");
		var syncFunc = Meteor.wrapAsync(instagram.userMedia);
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