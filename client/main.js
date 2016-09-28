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
				$scope.jobs = todos
			})
		$scope.title = "Dave's Main Todo App"
		$scope.addNewJob = () => {
			const newJob = {
				complete: false,
				dueDate: $scope.newTaskDueDate,
				task: $scope.newTaskTitle
			}
			$http
				.post('/api/todo', newJob)
				.then(({data: {_id}}) => {
					newJob._id = _id
					$scope.jobs.push(newJob)
				})
				.catch(console.error)
		}
		$scope.destroy = function(job) {
			$http
				.delete('/api/todo/' + job._id)
				.then(() => {
					let index = $scope.jobs.indexOf(job)
					$scope.jobs.splice(index, 1)
				})
				.catch(console.error)
		}
		$scope.complete = function(job) {
			$http({
					method: 'PATCH',
					url: '/api/todo/',
					data: job 
				})
				.then(() => {
					let index = $scope.jobs.indexOf(job)
					$scope.jobs[index].complete = !$scope.jobs[index].complete
				})
				.catch(console.error)
		}
	})