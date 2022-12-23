profileApp=angular.module('profileApp');

profileApp.service('paneFilterService', function($rootScope){

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

});
