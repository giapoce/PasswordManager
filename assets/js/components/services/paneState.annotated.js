profileApp=angular.module('profileApp');

profileApp.service('paneFilterService', ['$rootScope', function($rootScope){

var activePane='';

	return {
            getActivePane: function () {
                return activePane;
            },
            setActivePane: function(value) {
                activePane = value;
		$rootScope.$emit('paneChanged');
            }
        };

}]);
