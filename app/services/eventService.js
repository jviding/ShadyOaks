'use strict';

angular.module('App').factory('EventService', function () {

	var user = { 'name': 'keke' };
	var eventModel = {
			'date': '15.12.2015',
			'time': '18:30',
			'topic': 'Operation Bla',
			'in': [user],
			'out': [user]
	};
	var events = [];
	events.push(eventModel);

	function getEvents (callback) {
		callback(events);
	}

	function createEvent (value) {
		events.push(value);
	}
	

	return { 
		getEvents: getEvents,
		createEvent: createEvent
	}
});