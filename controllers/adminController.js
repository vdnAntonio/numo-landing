numoApp.controller('adminController', ['$scope','$http', '$location', '$routeParams', '$firebaseArray',
		function($scope, $http, $location, $routeParams, $firebaseArray) {
    	
		$scope.events = $firebaseArray(new Firebase('https://glaring-torch-515.firebaseio.com/events'));
		$scope.isUser = true;
		$scope.isAutoriz = false;

	    $scope.login = function(){
	    	var ref = new Firebase("https://glaring-torch-515.firebaseio.com");
			ref.authWithOAuthPopup("twitter", function(error, authData) {
	  			if (error) {
	    			console.log("Login Failed!", error);
	  			} else {
	    			console.log("Authenticated successfully with payload:", authData);
	    			$scope.aData = authData;
	    			$scope.users = $firebaseArray(new Firebase('https://glaring-torch-515.firebaseio.com/users'));
	    			
					$scope.users.$loaded().then(function(data){
						angular.forEach(data, function(value, key){
							if(value.uid === authData.uid){
								$scope.isUser = false;
								//$scope.isAutoriz = true;
								$scope.user = value;
								if($scope.user.admin === true){
									$scope.isAutoriz = true;
								}
							} 
						});
						if($scope.isUser){
						$scope.users.$add({
						    		nickname: authData.twitter.username,
						    		name: authData.twitter.displayName,
						    		uid: authData.auth.uid,
						    		image_url: authData.twitter.profileImageURL,
						    		admin: false
					    		});
						}
						$scope.isUser = false;
					});
	  			}
			});
	    };
	    
	    $scope.showForm = function(){
	    	$scope.addFormShow = true;
	    	$scope.editFormShow = false;

	    	clearForm();
	    };

	    $scope.hideForm = function(){
	    	$scope.addFormShow = false;
	    };

	    $scope.addFormSubmit = function(){
	    	$scope.events.$add({
	    		title: $scope.eventTitle,
	    		intro: $scope.eventIntro,
	    		description: $scope.eventDescription,
	    		day: $scope.eventDay,
	    		month: $scope.eventMonth,
	    		img_url: $scope.eventImageLink,
	    		creator: $scope.aData.twitter.displayName
	    	});

	    	clearForm();
	    };

	    $scope.showEvent = function(myEvent){
	    	$scope.editFormShow = true;
	    	$scope.addFormShow = false;
	    	$scope.eventTitle = myEvent.title;
	    	$scope.eventIntro = myEvent.intro;
			$scope.eventDescription = myEvent.description;
			$scope.eventDay = myEvent.day;
			$scope.eventMonth = myEvent.month;
			$scope.eventImageLink = myEvent.img_url;

			$scope.id = myEvent.$id;
	    };

	    $scope.editFormSubmit = function(){
	    	var id = $scope.id;
	    	var record = $scope.events.$getRecord(id);
	    	record.title = $scope.eventTitle;
	    	record.intro = $scope.eventIntro;
	    	record.description = $scope.eventDescription;
	    	record.day = $scope.eventDay;
	    	record.month = $scope.eventMonth;
	    	record.img_url = $scope.eventImageLink

	    	$scope.events.$save(record);
	    };

	    function clearForm(){
	    	$scope.eventTitle = "";
	    	$scope.eventIntro = "";
			$scope.eventDescription = "";
			$scope.eventDay = "";
			$scope.eventMonth = "";
			$scope.eventImageLink = "";
	    }

	}]);