(function() {
    var app = angular.module('app');
    
    app.controller('AppController', ['$location', function($location) {  
       
        var model = this;
        model.isActive = function (path) {
            return path === $location.path();
        }
    }]);
})();