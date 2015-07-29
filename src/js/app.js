angular.module('documee_admin', ['ngCookies', 'ui.bootstrap', 'ui.router', 'ngRoute', 'angularMoment', 'services', 'controllers'])
    .config(['$routeProvider', '$httpProvider', '$documeeApiProvider', function($routeProvider, $httpProvider, $documeeApiProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .when('/consumers', {
                templateUrl: 'templates/consumers-table.html',
                controller: 'ConsumersController'
            })
            .otherwise({redirectTo: '/consumers'});

        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                'response': function (response) {
                    //if (response.status === 401) {
                    //    console.log("Response 401");
                    //}
                    return response || $q.when(response);
                },
                'responseError': function (rejection) {
                    if (rejection.status === 401) {
                        $location.path('/login').search('returnTo', $location.path());
                    }
                    return $q.reject(rejection);
                }
            };
        });

        $documeeApiProvider.setHostAddress("http://documee-protoype.herokuapp.com/");
    }])
    .run(['$log', '$rootScope', '$location', '$cookies', function ($log, $rootScope, $location, $cookies) {
        // keep user logged in after page refresh
        //AuthenticationService.restoreCredentials();
        $log.debug("Stored cookies are: " + JSON.stringify($cookies.getAll()));
        if($cookies.get('connect.sid')){
            if(!$rootScope.globals){$rootScope.globals = {};}
            $rootScope.globals.logged_in=true;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            // redirect to login page if not logged in
            if ($location.path() !== '/login' && (!$rootScope.globals || !$rootScope.globals.logged_in)) {
                $location.path('/login');
            }
        });
    }]);
