(function() {
    var app = angular.module('app');
    
    app.factory('empresasProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('http://localhost:3000/empresas/api/');
        return proxy;     
    }]);
})();