Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');

Router.map(function () {
	this.route('home', {
		path: '/',
		data: function () {
			return Spots.find({}, {sort: {createdAt: -1}});
		}
	});
	this.route('newSpot', {
		path: '/spot/new'
	});
	this.route('viewSpot', {
		path: '/spot/:_id',
		data: function () {
			return Spots.findOne({_id: this.params._id});
		}
	});
	this.route('editSpot', {
		path: '/spot/:_id/edit',
		data: function () {
			return Spots.findOne({_id: this.params._id});
		}
	});
	this.route('userProfile', {
		path: '/user/:_id',
		waitOn: function () {
			return Meteor.subscribe('user', this.params._id);
		},
		data: function () {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
});