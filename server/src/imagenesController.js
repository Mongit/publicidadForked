module.exports = (function() {
    var ImagenesController = function(express, imagenesApi) {
        this.express = express.module;
        this.imagenesApi = imagenesApi;
        this.router = this.express.Router();
        
        var router = this.router;
            
        router.post('/post', imagenesApi.serialize.bind(imagenesApi));
        
    }
    
    return ImagenesController;
})();