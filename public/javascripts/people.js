angular.module('peopleApp', [])
	.controller('PeopleController', function($scope, $http) {
		var people = this;

		people.items = [];

		people.loadItems = function() {
			$http.get('/people').
				success(function(data, status, header, config) {
					people.items = data;
				}).
				error(function(data, status, header, config) {
					console.log(data, status, header, config);
				});
		};

		people.loadItems();

		people.addItem = function() {
			$http.post('/people', {name : people.name}).
				success(function(data, status, header, config) {
					people.name = '';
					people.items = data;
				}).
				error(function(data, status, header, config) {
					console.log(data, status, header, config);
				});
		};

		people.deleteItem = function(id) {
			$http.delete('/people?id=' + id).
				success(function(data, status, header, config) {
					people.items = data;
				}).
				error(function(data, status, header, config) {
					console.log(data, status, header, config);
				});
		}

		people.toUpdateItem = function(id) {
			$http.get('/people?id=' + id).
				success(function(data, status, header, config) {
					people.formUpdate = true;
					var item = data;
					people.id = item._id;
					people.name = item.name;
				}).
				error(function(data, status, header, config) {
					console.log(data, status, header, config);
				});
		}

		people.updateItem = function() {
			$http.put('/people', {id: people.id, name: people.name}).
				success(function(data, status, header, config) {
					people.items = data;
				}).
				error(function(data, status, header, config) {
					console.log(data, status, header, config);
				});
		}

	});