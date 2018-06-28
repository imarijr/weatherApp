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

weatherApp.controller('forecastController',['$scope','locationService', function($scope, locationService){
    $scope.location = locationService.location
}])