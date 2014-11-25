googleMaps = {

	geocode: function (lng, lat, cb) {
		console.log("[+] Google Maps Geocode...");
		HTTP.call("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDrtn8xtDaP_251WwFgxH8n5ZQkWOP2DlM", null, function (err, res) {
			googleMaps.return(res.data, err, cb);
		});
	},

	return: function (data, error, cb) {

		if (data.status != "OK")
			cb && cb(data.status);
		else
			cb && cb(null, data.results);
	}
}

Meteor.methods({
	googleGeocode: function (longitude, latitude) {
		var syncFunc = Meteor.wrapAsync(googleMaps.geocode);
		var result = syncFunc(longitude, latitude);
		return result;
	}
});