Template.map.rendered = function () {
	if (! Session.get('map'))
		gmaps.initialize();
};

Template.map.destroyed = function() {
	Session.set('map', false);
};