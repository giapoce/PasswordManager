profileApp=angular.module('profileApp');

profileApp.controller('appController',function($rootScope,$scope,$window,$location,$timeout,paneFilterService,itemFilterService,databaseFilterService,DatabasesFactory) {

  $scope.databases = [];
  $scope.sortKey='Database';
  $scope.activePane='';
 
  $scope.selectItem = function(d) {
        $location.path('/viewUsers');
	itemFilterService.setItemName(d);
        return true;
  };
  $scope.clearFilter=function() {
 	itemFilterService.setItemName('');
  };

  $scope.getActivePane = function() {
      $scope.activePane=paneFilterService.getActivePane();
  };


  $scope.setPane = function(p) {
        $scope.clearFilter();
        $location.path('/viewUsers');
	paneFilterService.setActivePane(p);
  };
  
  $rootScope.$on('paneChanged', function() {
        $scope.activePane=paneFilterService.getActivePane();
  });

  $rootScope.$on('databaseCreated', function() {
        $scope.activePane=paneFilterService.getActivePane();
        $scope.getDatabases();
  });
 

 ($scope.getDatabases = function() {

       this.databaseQuery=DatabasesFactory.query();
       this.databaseQuery.$promise.then(function (data) {

                $scope.databases = data;

          }, function (ErrorInfo) {

       });

  })();


 $scope.pageClass = function(path) {
   return (path == $location.path())? 'active':'';
 };


});
