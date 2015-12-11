var EmpresasApi = (function() {
    var EmpresasApi = function(models, empresaFactory, copy) {
        this.models = models;
        this.empresaFactory = empresaFactory;
        this.copy = copy;
    };
    
    EmpresasApi.prototype.validationErrMessages = function(err){
        Object.keys(err.errors).forEach(function(key) {
            var message = err.errors[key].message;
            console.log('Validation error for "%s": %s', key, message);
        });
    };
    EmpresasApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        that.models.empresa.find({}, function (err, empresas) {
                if (err) return console.log(err);
                res.json(empresas);
            });   
    };
    EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        var empresa = that.empresaFactory.get();
        empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
        empresa.save(function(err, empresa) {
            if(err) return that.validationErrMessages(err);
        }); 
        res.json(empresa);
    };

    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.empresa.findOne({ _id: req.params.id })
        .exec(function(err, empresa){
            if (err) return next(err);
            return res.json(empresa);
        });
    };
     
    EmpresasApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;
        var name = req.params.uniquename;
        
        that.models.empresa.findOne({"informacion.uniquename": name})    
            .exec(function(err, empresa){
            if (err) return next(err);
            return res.json(empresa);
        });
    };
    
    EmpresasApi.prototype.update = function(req, res, next) {
        var that = this;
        console.log("llego 1");
        console.log(req.params.id);
        that.models.empresa.findById(req.params.id, function (err, empresa) {
            if(err) return next(err);
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            empresa.save(function(err, empresa) {
                if(err) return that.validationErrMessages(err);
                res.json(empresa);
            }); 
        });
    };
    EmpresasApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.empresa.findByIdAndRemove(req.params.id, function(err, empresa) {
            if(err) return next(err);
            res.json({status: "ok"});
        }); 
    };      
    return EmpresasApi;
})();

module.exports = EmpresasApi;