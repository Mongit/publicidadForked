(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$http', '$location', 'empresasProxy', 'tokenStorage', function($http, $location, empresasProxy, tokenStorage) {
        var ctrl = this;

        var url = 'http://localhost:3000/empresas/api/';
        ctrl.empresas = [];
        ctrl.emailUsuario = "";
        

        ctrl.getAll = function(){
            empresasProxy.getAll(function(data){
                ctrl.empresas=data;
            });
        };
        ctrl.getAll();
        
        ctrl.delete = function (id) {
            empresasProxy.delete(id,function(){
               $location.path('/todos');
            });
        };
        ctrl.logout = function (){
            tokenStorage.clearToken();
            $location.path("/");
            return false;
        };
        ctrl.getEmail = function (){
            ctrl.emailUsuario = tokenStorage.getEmail();
        };
        ctrl.getEmail();
    }]);
})();