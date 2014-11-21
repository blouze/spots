gmaps = {
	// map object
	map: null,

	// map center
	center: null,

	// google markers objects
	markers: [],

	initialize: function() {
		console.log("[+] Initializing Google Maps...");
		var mapOptions = {
			zoom: 12,
			disableDefaultUI: true,
			//center: new google.maps.LatLng(53.565, 10.001),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var ref = this;

		this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		google.maps.event.addListener(this.map, 'zoom_changed', function() {
		    // 3 seconds after the zoom of the map has changed, pan back to the
		    // marker.
		    window.setTimeout(function() {
		    	ref.map.panTo(ref.center);
		    }, 3000);
		});

        // global flag saying we intialized already
        Session.set('map', true);
    },

    setCenter: function (coords) {
    	if (!this.map)
    		return;
		console.log("[+] Google Maps setCenter...");

    	this.center = new google.maps.LatLng(coords.latitude, coords.longitude);
    	this.map.setCenter(this.center);
    },

    addMarker: function (coords) {
    	if (!this.map)
    		return;
		console.log("[+] Google Maps addMarker...");

    	var marker = new google.maps.Marker({
    		map: this.map,
    		animation: google.maps.Animation.DROP,
    		position: new google.maps.LatLng(coords.latitude, coords.longitude)
    	});

    	var ref = this;

    	google.maps.event.addListener(marker, 'click', function() {
    		ref.map.setZoom(15);
    		ref.map.setCenter(marker.getPosition());
    	});

    	this.markers.push(marker);
    }
};