(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapFactory', 'productosFactory', 'uploadFilesFactory', 'modelFactory', 'empresasProxy'];  
    depArr.push(function($route, $location, mapFactory, productosFactory, uploadFilesFactory, modelFactory, empresasProxy) {
        var ctrl = this;
        
        ctrl.empresaId= $route.id;
        
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntro = undefined;
        ctrl.numero = undefined;
        ctrl.numeroInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        ctrl.lat = undefined;
        ctrl.long = undefined;
        ctrl.rubro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.tel = undefined;
        ctrl.face = undefined;
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.nota = undefined;
        ctrl.noContrato = undefined;
        ctrl.uniquename = undefined;
        ctrl.cliente = undefined;
        ctrl.telCliente = undefined;
        ctrl.correoCliente = undefined;
        ctrl.fechaContrato = undefined;//date
        ctrl.fechaVencimiento = undefined;//date
        ctrl.pago = undefined;
        ctrl.mapa = undefined;
        var prod = productosFactory();
        var modelInstance = modelFactory();
        
        //UPLOAD IMAGES Function
        ctrl.uploadFiles = function (files, errFiles, propertyName) {
            var up = uploadFilesFactory();
            ctrl.files = { [propertyName] : files };
            ctrl.errFiles = { [propertyName] : errFiles && errFiles[0] };
            up.upload(files, errFiles, propertyName, ctrl);
        };      

        var getOne = function(id) {
            empresasProxy.getOne(id, function(data, status, headers, config){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
                
                ctrl.mapa = mapFactory(latitud,longitud);
                ctrl.mapa.placeMarker(latitud,longitud);
                ctrl.mapa.getEventListener();
                
            });
        };
        getOne(ctrl.empresaId);
    
        ctrl.borrarMarker = function () {
            ctrl.mapa.borrarMarker();
        };
    
        ctrl.agregarProducto = function() {
            ctrl.producto = prod.agregarProducto(ctrl.productos, ctrl.producto);
        };
        ctrl.removerProducto = function() {
            ctrl.productos = prod.removerProducto(ctrl.productos, ctrl.remover);
        };
        ctrl.borrarProductos = function() {
            ctrl.productos = prod.borrarProductos(ctrl.productos);
        };
        
        ctrl.editar = function(){ 
            ctrl.lat = ctrl.mapa.getLat();
            ctrl.long = ctrl.mapa.getLong();
            empresasProxy.update(ctrl.empresaId, modelInstance.getModelFromCtrl(ctrl), function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/todos');
            });
        };
    });
    app.controller('EditarFormularioController', depArr); 
})();
