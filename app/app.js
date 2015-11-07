'use strict';

angular.module('App', [
	'ui.router',
	'ngSanitize'
	])
	.config( function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('events', {
				url: '/events', 
				views: {
					'header' : { templateUrl: 'views/header.html', controller: 'headerCtrl' },
					'content': { templateUrl: 'views/events.html', controller: 'eventsCtrl' },
					'footer' : { templateUrl: 'views/footer.html' }
				}
			})
			.state('home', {
				url: '/home', 
				views: {
					'header' : { templateUrl: 'views/header.html', controller: 'headerCtrl' },
					'content': { templateUrl: 'views/home.html', controller: 'homeCtrl' },
					'footer' : { templateUrl: 'views/footer.html' }
				}
			})
			.state('login', {
				url: '/login', 
				views: {
					'header' : { templateUrl: 'views/header.html', controller: 'headerCtrl' },
					'content': { templateUrl: 'views/login.html', controller: 'loginCtrl' },
					'footer' : { templateUrl: 'views/footer.html' }
				}
			})
			.state('register', {
				url: '/register', 
				views: {
					'header' : { templateUrl: 'views/header.html', controller: 'headerCtrl' },
					'content': { templateUrl: 'views/register.html', controller: 'registerCtrl' },
					'footer' : { templateUrl: 'views/footer.html' }
				}
			})
			.state('draw', {
				url: '/draw',
				views: {
					'header' : {},
					'content': { templateUrl: 'views/draw.html', controller: 'drawCtrl' },
					'footer' : {}
				}
			});
	});