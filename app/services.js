angular.module('services', [])
    .factory("$authentication", function($http, $rootScope, $documeeApi){
        var service = {};

        service.login = function (username, password, callback){
            $http.post($documeeApi.hostAddress + 'api/authenticate', { username: username, password: password })
                .success(function (data, status, headers, config) {
                    callback(null, data);
                })
                .error(function(data, status, headers, config) {
                    callback(data);
                });
        };

        service.setCredentials = function (user) {
            if(!$rootScope.globals){
                $rootScope.globals ={};
            }
            $rootScope.globals.logged_in = true;
        };

        service.clearCredentials = function () {
            if($rootScope.globals){
                delete $rootScope.globals.logged_in;
            }
        };

        return service;
    })

    .factory('$consumers', function($http, $documeeApi){
        var service = {};


        service.get = function(callback){
            $http.get($documeeApi.hostAddress + "api/consumers").
                success(function(data, status, headers, config) {
                    callback(null, data);
                }).
                error(function(data, status, headers, config) {
                    callback(data);
                });
        };

        service.changeAuthorized = function(consumer, callback){
            $http.post($documeeApi.hostAddress + "api/key/" + consumer.api_key + "/update_authorized", {authorized : consumer.authorized}).
                success(function(data, status, headers, config) {
                    callback(null, data);
                }).
                error(function(data, status, headers, config) {
                    callback(data);
                });
        };

        return service;
    })

    .provider('$documeeApi', function(){

        var apiHost;

        return {
            setHostAddress : function (host){
                apiHost = host;
            },

            $get : function(){
                return {
                    hostAddress : apiHost
                };
            }
        };
    });
