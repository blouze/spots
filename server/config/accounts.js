ServiceConfiguration.configurations.remove({
	service: "instagram"
});
ServiceConfiguration.configurations.insert({
	service: "instagram",
	clientId: Meteor.settings.instagram.client_id,
	scope:'basic',
	loginStyle: "redirect",
	secret: Meteor.settings.instagram.client_secret
});

if ( Meteor.users.find().count() === 0 ) {
	console.log(Meteor.settings.adminUser);
	Accounts.createUser(Meteor.settings.adminUser);
}