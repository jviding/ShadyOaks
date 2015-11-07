'use strict';

angular.module('App').factory('UserService', function () {

	function getUsers(callback) {
		var user = {'name': 'Blayer'};
		var users = [user];
		callback(users);
	}

	return {
		getUsers: getUsers
	}

});