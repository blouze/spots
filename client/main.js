Template.appError.helpers({
	error: function () {
		var err = Session.get("appError");
		if (err) {
			$("#modal-app-error").modal("show");
			return "" +
			"<p>We were not able to find your current position.</p>" +
			"<p>Make sure geolocation is enabled on your device.</p>" +
			"<p>Reason: " + err.message + "</p>";
		}
	}
});

Template.appError.events({
	'hidden.bs.modal #modal-app-error': function(e){
		Session.set("appError", null);
	}
});