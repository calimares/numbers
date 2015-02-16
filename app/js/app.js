'use strict';

/* App Module */

var app = angular.module('app', [
    'ngRoute',
    'nlControllers',
    'nlFilters',
    'nlServices'
]);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
                when('/:nlnumber', {
                    templateUrl: 'partials/numbers.html',
                    controller: 'numbersController'
                }).
                when('/', {
                    templateUrl: 'partials/numbers.html',
                    controller: 'numbersController'
                }).
                otherwise({
                    redirectTo: '/123'
                });

    }]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);
