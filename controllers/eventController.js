numoApp.controller('eventController',['$scope', '$routeParams', '$firebaseArray', '$routeParams',
		function($scope, $routeParams, $firebaseArray, $routeParams) {

      $scope.message = " text "

      //$scope.id = $routeParams.eventId;

      $scope.events = $firebaseArray(new Firebase('https://glaring-torch-515.firebaseio.com/events'));;

          $scope.events.$loaded().then(function(data){
            angular.forEach(data, function(value, key){
              if(value.$id === $routeParams.eventId){
                $scope.eveObj = value;
                document.getElementById("itemwrap").style.backgroundImage = "url(" + "'" + value.img_url + "'" + ")";
              } 
            });
          });
    
	}]);