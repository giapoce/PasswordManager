profileApp.controller('AddUserController',function($scope,$rootScope,$http,$window,$alert,itemFilterService,paneFilterService,UsersFactory,DatabasesFactory,passwdFilter){

    $scope.databases = [];
    $scope.xAlert= {};
  
    $rootScope.$on('paneChanged', function() {
        $scope.activePane=paneFilterService.getActivePane();
    });


    ($scope.toggleAlert = function(s) {
	$scope.xAlert.visibility=s;
    })(false);

    ($scope.getDatabases = function() {

       this.databaseQuery=DatabasesFactory.query();
       this.databaseQuery.$promise.then(function (data) {

                $scope.toggleAlert(false);
                $scope.databases = data;

          }, function (ErrorInfo) {

                $scope.xAlert.alertClass="danger";
                $scope.xAlert.alertMessage=ErroInfo.data;
                $scope.toggleAlert(true);

       });

    })();
	
    $scope.submitForm = function () {

         var formUserDataObj = {
             Username: $scope.selectedUsername,
             Password: $scope.selectedPassword,
             Database: $scope.selectedDatabase.Database,
             Vendor: $scope.activePane
         };
      
         ($scope.PostData = function () {


	   this.postUserData = UsersFactory.create(formUserDataObj); 
           this.postUserData.$promise.then(function (data) {

                   $scope.xAlert.alertClass = "success";
                   $scope.xAlert.alertMessage = "User was added succesfully";
                   $scope.toggleAlert(true);

           }, function (status) {

                   $scope.xAlert.alertClass = "danger";
                   $scope.xAlert.alertMessage = "User could not be created";
                   $scope.toggleAlert(true);

           });


         })();

   };

  
});
