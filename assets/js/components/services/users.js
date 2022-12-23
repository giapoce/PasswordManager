profileApp=angular.module('profileApp');

profileApp.factory('UsersFactory', function ($resource) {
    return $resource('/profiles', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

profileApp.factory('UserFactory', function ($resource) {
    return $resource('/profiles/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
