module.exports = (function() {
    var CorreoController = function(express, correoApi) {
        this.express = express.module;
        this.correoApi = correoApi;
        this.router = this.express.Router();
        
        var router = this.router;
        
        router.post('/', correoApi.send.bind(correoApi));
        
    }
    
    return CorreoController;
})();