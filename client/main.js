'use strict'

angular
	.module('todo', ['ngRoute'])
	.config( ($routeProvider) => {
		$routeProvider
			.when('/', {
				controller: 'main',
				templateUrl: '/partials/main.html'
			})
	})
	.controller('main', function($scope, $http) {
		$http
			.get('/api/todo')
			.then(({ data:{ todos }}) => {
				console.log('todos in main.js', todos)
				$scope.jobs = todos
			})
		$scope.title = "Dave's Main Todo App"
	})