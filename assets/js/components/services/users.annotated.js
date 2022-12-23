profileApp=angular.module('profileApp');

profileApp.factory('UsersFactory', ['$resource', function ($resource) {
    return $resource('/profiles', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

profileApp.factory('UserFactory', ['$resource', function ($resource) {
    return $resource('/profiles/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);
