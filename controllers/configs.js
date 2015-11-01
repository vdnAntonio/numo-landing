var numoApp = angular.module('numoApp', [
	'ngRoute',
	'firebase',
	]);

	// configure our routes
	numoApp.config(function($routeProvider) {
		$routeProvider

			.when('/home', {
				templateUrl : 'views/home/home.html',
				controller  : 'mainController'
			})
			.when('/admin', {
				templateUrl : 'views/admin/admin.html',
				controller  : 'adminController'
			})
			.when('/admin/:editId', {
				templateUrl : 'views/admin/edit.html',
				controller  : 'adminController'
			})
			.when('/home/:eventId', {
				templateUrl : 'views/home/event.html',
				controller  : 'eventController'
			}).
			when('/system',{
				templateUrl : 'views/system/system.html',
				controller: 'systemController'
			}).
			otherwise({
        	redirectTo: '/home'
      		});
	});