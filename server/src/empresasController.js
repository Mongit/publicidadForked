module.exports = (function() {
    var EmpresasController = function(express, empresasApi, tokenMiddleware) {
        this.express = express.module;
        this.empresasApi = empresasApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', empresasApi.getAll.bind(empresasApi));
            
        router.post('/', tokenMiddleware.validate.bind(tokenMiddleware), empresasApi.save.bind(empresasApi));

        router.get('/:id', empresasApi.getOne.bind(empresasApi));
                     
        router.get('/pages/:uniquename', empresasApi.getByUniqueName.bind(empresasApi));
        
        router.put('/:id', tokenMiddleware.validate.bind(tokenMiddleware), empresasApi.update.bind(empresasApi));
        
        router.delete('/:id', tokenMiddleware.validate.bind(tokenMiddleware), empresasApi.delete.bind(empresasApi));
        
    }
    
    return EmpresasController;

})();


