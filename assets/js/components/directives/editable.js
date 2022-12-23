profileApp=angular.module('profileApp');

profileApp.directive('editable', function(){

 return {

 restrict: 'AE',
 templateUrl: 'assets/templates/editable.html',
 scope: {
		 value: '=editable',
		 field: '@fieldType'
 
	},
        controller: function($scope){
                
                $scope.field = ($scope.field) ? $scope.field : 'text';
	
		$scope.editor = {
			 showing: false,
			 value: $scope.value
		};
                
		$scope.toggleEditor = function(){
 			$scope.editor.showing = !$scope.editor.showing;
		};
                
                $scope.save = function(){

			 $scope.value = $scope.editor.value;
			 $scope.toggleEditor();
			 $scope.$emit('saved')

		};
              
 
	}

 };

})
