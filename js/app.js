var app = angular.module('myContacts', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'contacts.html',
		controller: 'ContactsController'
	});
});