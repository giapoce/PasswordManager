var profileApp = angular.module('profileApp', ['ngResource', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngclipboard', 'mgcrea.ngStrap','angularUtils.directives.dirPagination']);

profileApp.config(['$routeProvider', function($routeProvider) {
            
            $routeProvider.when('/addUser', {
               controller: 'AddUserController',
               templateUrl: 'assets/partials/addUser.html'
            }).
            when('/addDatabase', {
               controller: 'AddDatabaseController',
               templateUrl: 'assets/partials/addDatabase.html'
            }).
            when('/viewUsers', {
               controller: 'ViewUsersController',
               templateUrl: 'assets/partials/viewUsers.html'
            }).
            when('/userDetail/:id', {
		controller: 'UserDetailController',
                templateUrl: 'assets/partials/userDetail.html'
	    }).
            otherwise({
               redirectTo: '/viewUsers'
            });

}]);
