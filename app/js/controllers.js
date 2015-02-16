'use strict';

/* Controllers */

var nlControllers = angular.module('nlControllers', []);

nlControllers.controller('numbersController', ['$scope', '$routeParams', 
    function ($scope, $routeParams) {
        var number = (isNaN(parseInt($routeParams.nlnumber))) ? '' : $routeParams.nlnumber;
        $scope.nlnumber = number;
    }]);

