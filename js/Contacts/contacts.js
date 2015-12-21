var app = angular.module('myContacts');

// app.config(function($routeProvider){
// 	$routeProvider

// 	.when('/', {
// 		templateUrl: 'contacts.html',
// 		controller: 'contactsController'
// 	});
// });

app.controller('ContactsController', function($scope, $firebaseArray){
	$scope.hello = "Hello";
	var ref = new Firebase("https://contactmanager-app.firebaseio.com/contacts");

	$scope.contacts = $firebaseArray(ref);

	//creating function to clear form after adding/editing contact;
	$scope.clearForm = function(){
		$scope.firstName = '';
		$scope.lastName = '';
		$scope.email = '';
		$scope.phone = '';
		$scope.company = '';
		$scope.street = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip = '';
	}


	$scope.addContact = function(){
		console.log("Add Info to Firebase")
		if ($scope.firstName) {
			var firstName = $scope.firstName;
			console.log(name);
		} else {
			var firstName = null;
		}	
		if ($scope.lastName) {
			var lastName = $scope.lastName;
		} else {
			var lastName = null;
		}
		if ($scope.email) {
			var email = $scope.email;
		} else {
			var email = null;
		}		
		if ($scope.phone) {
			var phone = $scope.phone;
		} else {
			var phone = "";
		}
		if ($scope.company) {
			var company = $scope.company;
		} else {
			var company = "";
		}	
		if ($scope.street) {
			var street = $scope.street;
		} else {
			var street = "";
		}
		if ($scope.city) {
			var city = $scope.city;
		} else {
			var city = "";
		}
		if ($scope.state) {
			var state = $scope.state;
		}	else {
			var state = "";
		}
		if ($scope.zip) {
			var zip = $scope.zip;
		} else {
			var zip = "";
		}

		$scope.contacts.$add({
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			company: company,
			address: [
				{
					street: street,
					city: city,
					state: state,
					zip: zip
				}
					]
		}).then(function(ref){
			var id = ref.key();
			console.log("Added Contact" + id);

			$scope.clearForm();


			alert("Conctact Added")
		});

	}

	$scope.showInfo = function(contact){
		console.log("working!");

		$scope.firstName = contact.firstName;
		$scope.lastName = contact.lastName;
		$scope.email = contact.email;
		$scope.phone = contact.phone;
		$scope.company = contact.company;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip = contact.address[0].zip;
	}

	$scope.showEditForm = function(contact){


		$scope.id = contact.$id;
		$scope.firstName = contact.firstName;
		$scope.lastName = contact.lastName;
		$scope.email = contact.email;
		$scope.phone = contact.phone;
		$scope.company = contact.company;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip = contact.address[0].zip;
	}

	$scope.editContact = function(){
		console.log("editing info func");

		var id = $scope.id;
		console.log(id);

		var data = $scope.contacts.$getRecord(id);

		data.firstName = $scope.firstName;
		data.lastName = $scope.lastName;
		data.email = $scope.email;
		data.phone = $scope.phone;
		data.company = $scope.company;
		data.address[0].street = $scope.street;
		data.address[0].city = $scope.city;
		data.address[0].state = $scope.state;
		data.address[0].zip = $scope.zip;

		$scope.contacts.$save(data).then(function(ref){
			console.log($scope.key);
		});
		$scope.clearForm();



		// $scope.firstName = contact.firstName;
		// $scope.lastName = contact.lastName;
		// $scope.email = contact.email;
		// $scope.phone = contact.phone;
		// $scope.company = contact.company;
		// $scope.street = contact.address[0].street;
		// $scope.city = contact.address[0].city;
		// $scope.state = contact.address[0].state;
		// $scope.zip = contact.address[0].zip;

		// console.log(contact);
	}

	$scope.removeFunc = function(contact){
		var warning = confirm("Are you sure you want to delete the contact");
		if (warning) {
			$scope.contacts.$remove(contact);
		} else {
			console.log("nice save");
		}
	}


});