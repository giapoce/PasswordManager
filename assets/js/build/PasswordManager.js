/*! PasswordManager 2016-08-04 */
var profileApp=angular.module("profileApp",["ngResource","ngRoute","ngCookies","ngSanitize","ngclipboard","mgcrea.ngStrap","angularUtils.directives.dirPagination"]);profileApp.config(["$routeProvider",function(a){a.when("/addUser",{controller:"AddUserController",templateUrl:"assets/partials/addUser.html"}).when("/addDatabase",{controller:"AddDatabaseController",templateUrl:"assets/partials/addDatabase.html"}).when("/viewUsers",{controller:"ViewUsersController",templateUrl:"assets/partials/viewUsers.html"}).when("/userDetail/:id",{controller:"UserDetailController",templateUrl:"assets/partials/userDetail.html"}).otherwise({redirectTo:"/viewUsers"})}]),profileApp=angular.module("profileApp"),profileApp.controller("appController",["$rootScope","$scope","$window","$location","$timeout","paneFilterService","itemFilterService","databaseFilterService","DatabasesFactory",function(a,b,c,d,e,f,g,h,i){b.databases=[],b.sortKey="Database",b.activePane="",b.selectItem=function(a){return d.path("/viewUsers"),g.setItemName(a),!0},b.clearFilter=function(){g.setItemName("")},b.getActivePane=function(){b.activePane=f.getActivePane()},b.setPane=function(a){b.clearFilter(),d.path("/viewUsers"),f.setActivePane(a)},a.$on("paneChanged",function(){b.activePane=f.getActivePane()}),a.$on("databaseCreated",function(){b.activePane=f.getActivePane(),b.getDatabases()}),(b.getDatabases=function(){this.databaseQuery=i.query(),this.databaseQuery.$promise.then(function(a){b.databases=a},function(a){})})(),b.pageClass=function(a){return a==d.path()?"active":""}}]),profileApp=angular.module("profileApp"),profileApp.directive("xalert",function(){return{restrict:"E",templateUrl:"assets/templates/alert.html",replace:!0,transclude:!0,scope:{xalertType:"@",xalertContent:"@",close:"&"},link:function(){}}}),profileApp=angular.module("profileApp"),profileApp.directive("editable",function(){return{restrict:"AE",templateUrl:"assets/templates/editable.html",scope:{value:"=editable",field:"@fieldType"},controller:["$scope",function(a){a.field=a.field?a.field:"text",a.editor={showing:!1,value:a.value},a.toggleEditor=function(){a.editor.showing=!a.editor.showing},a.save=function(){a.value=a.editor.value,a.toggleEditor(),a.$emit("saved")}}]}}),profileApp=angular.module("profileApp"),profileApp.filter("passwd",function(){return function(a,b){a=a||"",b=b||"*";for(var c="",d=0;d<a.length;d++)c+=b;return c}}),profileApp=angular.module("profileApp"),profileApp.filter("unique",function(){return function(a,b){if(b===!1)return a;if((b||angular.isUndefined(b))&&angular.isArray(a)){var c=[],d=function(a){return angular.isObject(a)&&angular.isString(b)?a[b]:a};angular.forEach(a,function(a){for(var b=!1,e=0;e<c.length;e++)if(angular.equals(d(c[e]),d(a))){b=!0;break}b||c.push(a)}),a=c}return a}}),profileApp=angular.module("profileApp"),profileApp.service("databaseFilterService",["$rootScope",function(a){var b="";return{getDatabaseName:function(){return b},setDatabaseName:function(c){b=c,a.$emit("databaseCreated")}}}]),profileApp=angular.module("profileApp"),profileApp.factory("DatabasesFactory",["$resource",function(a){return a("/databases",{},{query:{method:"GET",isArray:!0},create:{method:"POST"}})}]),profileApp.factory("DatabaseFactory",["$resource",function(a){return a("/databases/:id",{},{show:{method:"GET",params:{id:"@id"}},update:{method:"PUT",params:{id:"@id"}},"delete":{method:"DELETE",params:{id:"@id"}}})}]),profileApp=angular.module("profileApp"),profileApp.service("itemFilterService",["$rootScope",function(a){var b="";return{getItemName:function(){return b},setItemName:function(c){b=c,a.$emit("changed")}}}]),profileApp=angular.module("profileApp"),profileApp.service("paneFilterService",["$rootScope",function(a){var b="";return{getActivePane:function(){return b},setActivePane:function(c){b=c,a.$emit("paneChanged")}}}]),profileApp=angular.module("profileApp"),profileApp.factory("UsersFactory",["$resource",function(a){return a("/profiles",{},{query:{method:"GET",isArray:!0},create:{method:"POST"}})}]),profileApp.factory("UserFactory",["$resource",function(a){return a("/profiles/:id",{},{show:{method:"GET"},update:{method:"PUT",params:{id:"@id"}},"delete":{method:"DELETE",params:{id:"@id"}}})}]),profileApp.controller("AddDatabaseController",["$scope","$rootScope","$http","$window","$alert","itemFilterService","paneFilterService","databaseFilterService","DatabasesFactory","passwdFilter",function(a,b,c,d,e,f,g,h,i,j){a.databases=[],a.xAlert={},a.vendors={vendor1:"ORACLE",vendor2:"SQL Server"},a.selectedVendor="ORACLE",b.$on("paneChanged",function(){a.activePane=g.getActivePane()}),(a.toggleAlert=function(b){a.xAlert.visibility=b})(!1),a.submit=function(){var b={Database:a.selectedDatabase,Enviroment:a.selectedEnviroment,Vendor:a.selectedVendor,Hostname:a.selectedHostname};(a.PostData=function(){this.postUserData=i.create(b),this.postUserData.$promise.then(function(c){a.xAlert.alertClass="success",a.xAlert.alertMessage="Database was added succesfully",a.toggleAlert(!0),h.setDatabaseName(b.Database)},function(b){a.xAlert.alertClass="danger",a.xAlert.alertMessage="Database could not be created",a.toggleAlert(!0)})})()}}]),profileApp.controller("AddUserController",["$scope","$rootScope","$http","$window","$alert","itemFilterService","paneFilterService","UsersFactory","DatabasesFactory","passwdFilter",function(a,b,c,d,e,f,g,h,i,j){a.databases=[],a.xAlert={},b.$on("paneChanged",function(){a.activePane=g.getActivePane()}),(a.toggleAlert=function(b){a.xAlert.visibility=b})(!1),(a.getDatabases=function(){this.databaseQuery=i.query(),this.databaseQuery.$promise.then(function(b){a.toggleAlert(!1),a.databases=b},function(b){a.xAlert.alertClass="danger",a.xAlert.alertMessage=ErroInfo.data,a.toggleAlert(!0)})})(),a.submitForm=function(){var b={Username:a.selectedUsername,Password:a.selectedPassword,Database:a.selectedDatabase.Database,Vendor:a.activePane};(a.PostData=function(){this.postUserData=h.create(b),this.postUserData.$promise.then(function(b){a.xAlert.alertClass="success",a.xAlert.alertMessage="User was added succesfully",a.toggleAlert(!0)},function(b){a.xAlert.alertClass="danger",a.xAlert.alertMessage="User could not be created",a.toggleAlert(!0)})})()}}]),profileApp.controller("UserDetailController",["$scope","$http","$window","$timeout","$alert","$routeParams","UsersFactory","UserFactory","passwdFilter",function(a,b,c,d,e,f,g,h,i){a.user={},a.xAlert={},(a.toggleAlert=function(b){a.xAlert.visibility=b})(!1),(a.getUserData=function(){this.getUserData=h.show({id:f.id}),this.getUserData.$promise.then(function(b){a.toggleAlert(!1),a.user=b},function(b){a.xAlert.alertClass="danger",a.xAlert.alertMessage="Error retrieving data",a.toggleAlert(!0)})})(),a.$on("saved",function(b,c){d(function(){(a.putData=function(){this.putUserData=h.update({id:f.id},a.user),this.putUserData.$promise.then(function(b){a.toggleAlert(!1),a.xAlert.alertClass="success",a.xAlert.alertMessage="User was changed succesfully",a.toggleAlert(!0)},function(b){a.xAlert.alertClass="danger",a.xAlert.alertMessage="User could not be changed",a.toggleAlert(!0)})})()},0),b.stopPropagation()})}]),profileApp.controller("ViewUsersController",["$rootScope","$scope","$http","$timeout","$location","$window","$alert","$filter","paneFilterService","itemFilterService","UsersFactory","UserFactory","passwdFilter",function(a,b,c,d,e,f,g,h,i,j,k,l,m){b.profiles=[],b.xAlert={},b.reloaded=!1,(b.toggleAlert=function(a){b.xAlert.visibility=a})(!1),b.reverse=0,b.sortKey="Username",b.sort=function(a){b.sortKey=a,b.reverse=!b.reverse},b.disableFilter=function(){j.setItemName("")},a.$on("changed",function(){b.selectedItem=j.getItemName(),b.setFilter()}),a.$on("paneChanged",function(){b.activePane=i.getActivePane(),b.setFilter()}),b.selectPane=function(a){b.disableFilter(),i.setActivePane(a)},b.setFilter=function(){switch(b.activePane=i.getActivePane(),b.selectedItem=j.getItemName(),b.typedKey=[],b.searchKey=[],b.activePane){case"Unix":b.typedKey.Hostname=b.typKey,b.searchKey.Hostname=b.selectedItem;default:b.typedKey.Database=b.typKey,b.searchKey.Database=b.selectedItem}},(b.getUsers=function(a){b.selectedItem=a?j.getItemName():"",b.activePane=a?i.getActivePane():"",this.profileQuery=k.query(),this.profileQuery.$promise.then(function(a){b.toggleAlert(!1),b.profiles=a},function(a){b.xAlert.alertClass="danger",b.xAlert.alertMessage=a.data?a.data:"Server may be down, please check",b.toggleAlert(!0)}),a?b.setFilter():b.searchKey=""})(!0),b.removeProfile=function(a){this.deleteAction=l["delete"]({id:a}),this.deleteAction.$promise.then(function(c){b.toggleAlert(!1),delete b.databases[a],b.timer=d(function(){e.path("/")},100)},function(a){b.xAlert.alertClass="danger",b.xAlert.alertMessage="Could not delete user",b.toggleAlert(!0)})},b.$on("$destroy",function(a){d.cancel(b.timer)})}]);