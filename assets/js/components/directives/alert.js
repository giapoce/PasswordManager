profileApp=angular.module('profileApp');

profileApp.directive("xalert", function(){
return {

	restrict: 'E',
	templateUrl: "assets/templates/alert.html",
        replace:true,
        transclude:true,
        scope : {
	  xalertType: "@",
	  xalertContent: "@",
          close: "&"
	},
	link: function(){

	}
	
};
});
