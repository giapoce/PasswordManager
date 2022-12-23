profileApp.controller('AddDatabaseController',function($scope,$rootScope,$http,$window,$alert,itemFilterService,paneFilterService,databaseFilterService,DatabasesFactory,passwdFilter){

    $scope.databases = [];
    $scope.xAlert= {};
    $scope.vendors = {
        vendor1 : 'ORACLE',
        vendor2 : 'SQL Server'
    };
    $scope.selectedVendor='ORACLE';

  
    $rootScope.$on('paneChanged', function() {
        $scope.activePane=paneFilterService.getActivePane();
    });


    ($scope.toggleAlert = function(s) {
	$scope.xAlert.visibility=s;
    })(false);

	
    $scope.submit = function () {

         var formDatabaseObj = {
             Database: $scope.selectedDatabase,
             Enviroment: $scope.selectedEnviroment,
             Vendor: $scope.selectedVendor,
             Hostname: $scope.selectedHostname
         };
      
         ($scope.PostData = function () {


	   this.postUserData = DatabasesFactory.create(formDatabaseObj); 
           this.postUserData.$promise.then(function (data) {

                   $scope.xAlert.alertClass = "success";
                   $scope.xAlert.alertMessage = "Database was added succesfully";
                   $scope.toggleAlert(true);
                   databaseFilterService.setDatabaseName(formDatabaseObj.Database);

           }, function (status) {

                   $scope.xAlert.alertClass = "danger";
                   $scope.xAlert.alertMessage = "Database could not be created";
                   $scope.toggleAlert(true);

           });


         })();

   };

  
});
