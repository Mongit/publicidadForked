describe("ver controller", function(){
    var url = 'http://localhost:3000/empresas/api/';
    var all = [
        { nombre: 'Agua del parque', direccion : 'jalisco', id: 10},
        { nombre: 'famsa', direccion : 'madero', id: 11 },
        { nombre: 'electra', direccion : 'paseo', id: 12 }
    ];
    
    beforeEach(module('app')); 
    
    var $controller, $httpMock;

    beforeEach(inject(function(_$controller_){//beforeEach runs code before each test.
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {//crea una nva instancia que se usa para resolver referencias cuando se hace la instancía el controller.
        $httpMock = $httpBackend;
        $httpBackend.when('GET',  url).respond(all);
    }));
    
    it('loads empresas on TodosController', function() {
        var controller = $controller('TodosController');    
        expect(controller.empresas).toEqual([]);
        
        $httpMock.expectGET(url);
        $httpMock.flush();        
        
        expect(controller.empresas).toEqual(all);
    });
});