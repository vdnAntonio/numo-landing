numoApp.controller('systemController',['$scope','$routeParams','$firebaseArray','$routeParams','$http', 'fac', 'eventsFactory',
		function($scope, $routeParams, $firebaseArray, $routeParams, $http, fac, eventsFactory) {

//------ SERVIE EXAMPLE ------//
      fac.getUsers().then( function(data){
        $scope.users = data;
      });
      fac.getEvents().then( function(data){
        $scope.events = data;
      });

//------ SERVIE EXAMPLE ------//
    /*$scope.events = eventsFactory;*/

	}]);
numoApp.constant('fbURL', 'https://glaring-torch-515.firebaseio.com/events');
//------ SERVIE EXAMPLE ------//
numoApp.factory('eventsFactory', function($firebaseArray, fbURL){
    return $firebaseArray(new Firebase(fbURL));
});

numoApp.constant('gitURL', 'https://api.github.com/');
//------ SERVIE EXAMPLE ------//
numoApp.service('fac', function($http, $q, gitURL){
  var deffrred = $q.defer();

  $http.get(gitURL + 'users')
      .then(function(data){
         deffrred.resolve(data);
      });
  $http.get(gitURL + 'events')
      .then(function(data){
         deffrred.resolve(data);
      });
      
  this.getUsers = function(){
    return deffrred.promise;
  }
  this.getEvents = function(){
    return deffrred.promise;
  } 
});