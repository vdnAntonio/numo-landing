numoApp.controller('systemController',['$scope','$routeParams','$firebaseArray','$routeParams','$http', 'fac', 'eventsFactory',
		function($scope, $routeParams, $firebaseArray, $routeParams, $http, fac, eventsFactory) {

//------ SERVICE EXAMPLE ------//
      /*fac.getUsers().then( function(data){
        $scope.users = data;
      });
      fac.getEvents().then( function(data){
        $scope.events = data;
      });*/

      //https://api.instagram.com/oauth/authorize/?client_id=3898138cfc434eb09271a5659bf42088&redirect_uri=http://localhost:36510/#/home&response_type=code
      $http.get('https://api.instagram.com/oauth/authorize/?client_id=3898138cfc434eb09271a5659bf42088&redirect_uri=http://localhost:36510/#/home&response_type=code')
      .then(function(data){
         console.log(data);
      });


//------ FACTORY EXAMPLE ------//
    /*$scope.events = eventsFactory;*/

	}]);
numoApp.constant('fbURL', 'https://glaring-torch-515.firebaseio.com/events');
//------ FACTORY EXAMPLE ------//
numoApp.factory('eventsFactory', function($firebaseArray, fbURL){
    return $firebaseArray(new Firebase(fbURL));
});

numoApp.constant('gitURL', 'https://api.github.com/');
//------ SERVICE EXAMPLE ------//
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