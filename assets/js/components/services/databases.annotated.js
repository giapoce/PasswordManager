profileApp=angular.module('profileApp');

profileApp.factory('DatabasesFactory', ['$resource', function ($resource) {
    return $resource('/databases', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

profileApp.factory('DatabaseFactory', ['$resource', function ($resource) {
    return $resource('/databases/:id', {}, {
        show: { method: 'GET', params: {id: '@id'} },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);
