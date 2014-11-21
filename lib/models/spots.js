Schema = {};

Spots = new Mongo.Collection("spots");

Schema.Spots = new SimpleSchema({
	name: {
		type: String,
		label: "Spot name"
	},
	location: {
		type: [Number],
		label: "Location",
		decimal: true
	},
	picture: {
		type: String,
		label: "Picture"
	},
	secret: {
		type: Boolean,
		defaultValue: false,
		label: "Secret"
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