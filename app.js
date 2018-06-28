// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES

weatherApp.config(function ($routeProvider){
    
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
})

//SERVICES

weatherApp.service('locationService', function() {

    this.city = "New York, NY"
})


//CONTROLLERS
weatherApp.controller('homeController',['$scope','locationService', function($scope, locationService){
    $scope.location = locationService.location
    $scope.$watch('location', function(){
        locationService.location = $scope.location
    })


}])

weatherApp.controller('forecastController',['$scope', '$resource','locationService', function($scope, $resource, locationService){
    
    $scope.location = locationService.location

    $scope.weatherAPI = 
$resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=df852e8d86d8f4a0f601a3a860703ee1", {
    callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}
})

 $scope.convertToFarenheit = function(degK){

    return Math.round((1.8 * (degK - 273)) + 32)

 }

 $scope.convertTime = function(time){
     return new Date(time * 1000)
 }

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.location, cnt: 2})

    console.log($scope.weatherResult)
}])