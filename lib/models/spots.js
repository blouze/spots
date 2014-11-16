Schema = {};

Spots = new Mongo.Collection("spots");

GeocoordsSchema = new SimpleSchema({
	lng: {
		type : Number,
		decimal: true,
		min: -180,
		max: 180
	},
	lat: {
		type : Number,
		decimal: true,
		min: -90,
		max: 90
	}
});

LocationSchema = new SimpleSchema({
	type : {
		type : String,
		autoValue: function() {
			return "Point";
		}
	},
	coordinate: {
		type: GeocoordsSchema
	}
});

Schema.Spots = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	location: {
		type: LocationSchema,
		label: "Location",
		autoValue: function () {
			if (this.isInsert) {
				if (this.isSet) {
					var userLocation = this.value.split(", ");
					return {
						coordinate: {
							lng: parseFloat(userLocation[0]),
							lat: parseFloat(userLocation[1])
						}
					}
				}
			}
		}
	},
	picture: {
		type: String,
		label: "Picture",
		autoform: {
			hidden: true
		}
	},
	// Force value to be current date (on server) upon insert
	// and prevent updates thereafter.
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date};
			} else {
				this.unset();
			}
		},
		autoform: {
			hidden: true
		}
	},
	// Force value to be current date (on server) upon update
	// and don't allow it to be set upon insert.
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		autoform: {
			hidden: true
		},
		denyInsert: true,
		optional: true
	}
});

Spots.attachSchema(Schema.Spots);

Spots.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});