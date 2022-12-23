profileApp.controller('UserDetailController',function($scope,$http,$window,$timeout,$alert,$routeParams,UsersFactory,UserFactory,passwdFilter){

    $scope.user = {};
    $scope.xAlert = {};

    ($scope.toggleAlert = function(s) {
        $scope.xAlert.visibility=s;
    })(false);

 
   ($scope.getUserData = function () {

        this.getUserData=UserFactory.show({id: $routeParams.id});
        this.getUserData.$promise.then(function (data) {

                $scope.toggleAlert(false);
                $scope.user = data;

        }, function (data) {

                $scope.xAlert.alertClass="danger";
                $scope.xAlert.alertMessage="Error retrieving data";
                $scope.toggleAlert(true);

        });

    })();


    $scope.$on('saved', function(event,reload){


      $timeout(function() { 	
      

        ($scope.putData = function () {

           this.putUserData=UserFactory.update({id: $routeParams.id},$scope.user);
           this.putUserData.$promise.then(function (data) {

                   $scope.toggleAlert(false);
                   $scope.xAlert.alertClass = "success";
                   $scope.xAlert.alertMessage = "User was changed succesfully";
                   $scope.toggleAlert(true);

           }, function (status) {

                   $scope.xAlert.alertClass = "danger";
                   $scope.xAlert.alertMessage = "User could not be changed";
                   $scope.toggleAlert(true);

           });

        })();


	},0)


        event.stopPropagation();


    });	
              
});
