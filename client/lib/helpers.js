UI.registerHelper("siteName", function () {
	return "Shredd";
});

UI.registerHelper("createdByCurrentUser", function (doc) {
	return Meteor.userId() && doc && Meteor.userId() === doc.createdBy;
});

UI.registerHelper("formatDate", function(datetime, format) {
	if (moment) {
		if (format == "calendar")
			return moment(datetime).calendar();
		else {
			f = DateFormats[format];
			return moment(datetime).format(f);
		}
	}
	else {
		return datetime;
	}
});

var DateFormats = {
	short: "DD MMMM - YYYY",
	long: "MM/DD/YYYY"
};