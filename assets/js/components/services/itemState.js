profileApp=angular.module('profileApp');

profileApp.service('itemFilterService', function($rootScope){

var itemName='';

	return {
            getItemName: function () {
                return itemName;
            },
            setItemName: function(value) {
                itemName = value;
		$rootScope.$emit('changed');
            }
        };

});
