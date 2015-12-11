(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapFactory', 'modelFactory', 'empresasProxy'];
    
    depArr.push(function($route, $location, mapFactory, modelFactory, empresasProxy) {
        var ctrl = this; 
        ctrl.negocio= $route.negocio;
        var modelInstance = modelFactory();
        
        ctrl.getOne = function (name) {
            empresasProxy.getByUniqueName(name, function(data){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
    
                var mapa = mapFactory(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
                
            });
        };
        
        ctrl.getOne(ctrl.negocio);
    });
    app.controller('NegocioController', depArr);
})();