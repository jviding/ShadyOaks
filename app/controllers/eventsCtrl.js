'use strict';

angular.module('App').controller('eventsCtrl', function ($scope, $sce, EventService, UserService) {
	$scope.showForm = false;
	$scope.newEvent = function (bol) {
		$scope.showForm = bol;
	};
	$scope.showEdit = false;
	$scope.showDel = false;
	$scope.editEvent = function () {
		$scope.showDel = false;
		if ($scope.showEdit) {
			$scope.showEdit = false;
		}
		else {
			$scope.showEdit = true;
		}
	};
	$scope.delEvent = function () {
		$scope.showEdit = false;
		if ($scope.showDel) {
			$scope.showDel = false;
		}
		else {
			$scope.showDel = true;
		}
	};
	$scope.createEvent = function () {
		var newEvent = {
			'date': $sce.trustAsHtml($scope.eventDate),
			'time': $sce.trustAsHtml($scope.eventTime),
			'topic': $sce.trustAsHtml($scope.eventTopic),
			'in': [],
			'out': []
		};
		EventService.createEvent(newEvent);
		$scope.eventDate = '';
		$scope.eventTime = '';
		$scope.eventTopic = '';
		EventService.getEvents(function (events) {
			$scope.events = events;
		});
		$scope.showForm = false;
		$scope.showEdit = false;
		$scope.showDel = false;
	};


	EventService.getEvents(function (events) {
		$scope.events = events;
	});
	UserService.getUsers(function (users) {
		$scope.users = users;
	});

});