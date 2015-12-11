(function() {
    var app = angular.module('app');
    
    app.factory('productosFactory', [function() {//singleton.
        
        var ProductosClass = function() {
        };
        ProductosClass.prototype.removerProducto = function(arr, producto){
            var sonDiferentes = function sonDiferentes (element, index, array) {
                return element.titulo !== producto;
            }
            arr = arr.filter(sonDiferentes); 
            return arr;
        };
        ProductosClass.prototype.agregarProducto = function(arr, producto){
            if(producto){
                arr.push(producto);
                producto = undefined;
                return producto;
            }
        };
        ProductosClass.prototype.borrarProductos = function(productos){
            productos = [];
            return productos;
        };
        
        return function() {
            return new ProductosClass();
        };
        
    }]);
})();