numoApp.controller('mainController',['$scope', '$routeParams', '$firebaseArray', '$location',
		function($scope, $routeParams, $firebaseArray, $location) {
    	 initMap();
  
    	$scope.titlePage = 'Numo';
      $scope.events = $firebaseArray(new Firebase('https://glaring-torch-515.firebaseio.com/events'));

      $scope.showEvent = function(id){
          $scope.events.$loaded().then(function(data){
            angular.forEach(data, function(value, key){
              if(value.$id === id){
                $scope.evtitle = value.title;
              } 
            });
            //$location.path("/home/event");
          });
      };
     //share functions
      $scope.vk = function(eventW) {
          console.log(eventW)
            url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent("http://localhost:64029/#/home/-K300UzhmbBNqksQYOrX");
            url += '&title='       + encodeURIComponent(eventW.title);
            url += '&description=' + encodeURIComponent(eventW.description);
            url += '&image='       + encodeURIComponent(eventW.img_url);
            url += '&noparse=true';
            popup(url);
            console.log(url);
          };

      $scope.facebook = function(eventW){
            url  = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]='     + encodeURIComponent("http://localhost:64029/#/home/-K300UzhmbBNqksQYOrX");
            url += '&p[summary]='   + encodeURIComponent(eventW.title);
            url += '&p[url]='       + encodeURIComponent(eventW.description);
            url += '&p[images][0]=' + encodeURIComponent(eventW.img_url);
            popup(url);
      };

      function popup(url) {
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
          };

	}]);


function initMap(){

    	 var map;
     var dnipro = new google.maps.LatLng(48.453910, 35.065336);

        function initialize() {

   var roadAtlasStyles = [
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "lightness": -4 },
        { "gamma": 1.18 }
      ]
  }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "gamma": 1 },
        { "lightness": -24 }
      ]
  }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "transit",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "road",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "landscape",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "poi",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
  }
            ]

            var mapOptions = {
                zoom: 15,
                minZoom: 15,
                center: dnipro,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
                }
            };

             var marker = new google.maps.Marker({
		     position: dnipro,
		     map: map,
		     title: 'we here'
		   });

            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);

            var styledMapOptions = {
                
            };

            var usRoadMapType = new google.maps.StyledMapType(
                roadAtlasStyles, styledMapOptions);

            map.mapTypes.set('usroadatlas', usRoadMapType);
            map.setMapTypeId('usroadatlas');

            marker.setMap(map);
        }

        google.maps.event.addDomListener(window, 'load', initialize);
}