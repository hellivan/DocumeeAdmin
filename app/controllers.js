angular.module('controllers', ['services', 'ui.bootstrap'])
    .controller("LoginController", function ($log, $scope, $rootScope, $location, $authentication) {
        // reset login status
        $authentication.clearCredentials();

        $scope.login = function(){
            $scope.dataLoading = true;
            $authentication.login($scope.username, $scope.password, function(err, data) {
                if(err){return console.log(data);}

                $location.path('/');
                $authentication.setCredentials();
            });
        };
        $log.debug("Loaded LoginController");
    })
    .controller("ConsumersController", function ($log, $scope, $consumers){
        function update(){
            $consumers.get(function(err, consumers){
                if(err) {throw err;}
                $scope.consumers = consumers;
            });
        }

        $scope.changeAuthorized = function (consumer){
            $consumers.changeAuthorized(consumer, function(err, res_consumer){
                if(err) { throw err; }
                consumer.authorized = res_consumer.authorized;
            });
        };

        update();

        $log.debug("Loaded ConsumersController");
    });