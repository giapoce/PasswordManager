profileApp.controller('ViewUsersController',function($rootScope,$scope,$http,$timeout,$location,$window,$alert,$filter,paneFilterService,itemFilterService,UsersFactory,UserFactory,passwdFilter){

  $scope.profiles = [];
  $scope.xAlert = {};
  $scope.reloaded=false;

  ($scope.toggleAlert = function(s) {
        $scope.xAlert.visibility=s;
  })(false);


  $scope.reverse=0;  
  $scope.sortKey='Username';

  $scope.sort = function(keyname){
        $scope.sortKey = keyname;  
        $scope.reverse = !$scope.reverse;
  }

  $scope.disableFilter = function() {
	itemFilterService.setItemName('');
  };

  $rootScope.$on('changed', function() {
	$scope.selectedItem=itemFilterService.getItemName();
        $scope.setFilter();
  });

  $rootScope.$on('paneChanged', function() {
	$scope.activePane=paneFilterService.getActivePane();
        $scope.setFilter();
  });


  $scope.selectPane = function(p) {
        $scope.disableFilter();
        paneFilterService.setActivePane(p);
  };


  $scope.setFilter = function() {
	
	$scope.activePane=paneFilterService.getActivePane();
	$scope.selectedItem=itemFilterService.getItemName();

        $scope.typedKey=[];
        $scope.searchKey=[];

	switch($scope.activePane) {

           case 'Unix':

		$scope.typedKey['Hostname']=$scope.typKey;
		$scope.searchKey['Hostname']=$scope.selectedItem;

	   default:

		$scope.typedKey['Database']=$scope.typKey;
		$scope.searchKey['Database']=$scope.selectedItem;
	
        }
 	

  };

  ($scope.getUsers = function(paneFilterOn) {
    
	$scope.selectedItem=(paneFilterOn)?itemFilterService.getItemName():'';
	$scope.activePane=(paneFilterOn)?paneFilterService.getActivePane():'';
        
    	this.profileQuery=UsersFactory.query();
    	this.profileQuery.$promise.then(function (data) {

                   $scope.toggleAlert(false);
               	   $scope.profiles = data;

        	}, function (ErrInfo) {

                    $scope.xAlert.alertClass="danger";
                    $scope.xAlert.alertMessage=(ErrInfo.data)?ErrInfo.data:"Server may be down, please check";
                    $scope.toggleAlert(true);

    	});

        if (!paneFilterOn) {

               $scope.searchKey='';

        } else {

	       $scope.setFilter();
        }

    })(true);

    $scope.removeProfile = function (userId) {

       
       this.deleteAction=UserFactory.delete({ id: userId });
       this.deleteAction.$promise.then(function (data) {

                $scope.toggleAlert(false);
                delete $scope.databases[userId];
	        $scope.timer=$timeout(function() {
                        $location.path('/');
                },100);

               
       }, function (data) {

                $scope.xAlert.alertClass="danger";
                $scope.xAlert.alertMessage="Could not delete user";
                $scope.toggleAlert(true);

       });

    };

   $scope.$on("$destroy",function( event ) {
	  $timeout.cancel( $scope.timer );
    });


});
