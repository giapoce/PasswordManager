profileApp=angular.module('profileApp');

profileApp.service('databaseFilterService', function($rootScope){

var databaseName='';

	return {
            getDatabaseName: function () {
                return databaseName;
            },
            setDatabaseName: function(value) {
                databaseName = value;
		$rootScope.$emit('databaseCreated');
            }
        };

});
