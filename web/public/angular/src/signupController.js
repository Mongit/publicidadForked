(function() {
    var app = angular.module('app');
    
    app.controller('SignupController', ['usuariosProxy', '$location', function(proxy, $location) {
        var ctrl = this;
        
        ctrl.email = '';
        ctrl.password = '';
        
        ctrl.signup = function() {
            proxy.signup(ctrl, function() {
                $location.path('/signin');
            });
        };
    }]);
})();