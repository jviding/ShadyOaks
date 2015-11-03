'use strict';

angular.module('App', [
	'ui.router'
	])
	.config( function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home', 
				views: {
					'header' : { templateUrl: 'views/header.html' },
					'content': { templateUrl: 'views/home.html', controller: 'homeCtrl' },
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