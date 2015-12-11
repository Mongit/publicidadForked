var UsuariosApi = (function() {
    var UsuariosApi = function(models, usuarioFactory, moment, jwt) {
        this.models = models;
        this.usuarioFactory = usuarioFactory;
        
        this.moment = moment.module;
        this.jwt = jwt.module;
    };
    
    UsuariosApi.prototype.findByEmail = function(req, res, next) {
        var that = this;
   
        that.models.usuario.findOne({ email: req.body.email}, function(err, user) {
            if(err) {
                return next(err);
            }

            if (!user) {
                // incorrect username
                return res.sendStatus(401);
            }

            if (!user.password === req.body.password) {
                // incorrect password
                return res.sendStatus(401);
            }

            var expires = that.moment().add(30, 'minutes').valueOf();
            var token = that.jwt.encode({
                iss: user.email,
                exp: expires
            }, 'cualquiera');

            console.log({
                token : token,
                expires: expires,
                user: user
            });
            res.json({
                token : token,
                expires: expires,
                user: user
            });
        });
    };
    
    UsuariosApi.prototype.save = function(req, res, next) {
        var that = this;        
        var usuario = that.usuarioFactory.get();    
        
        for (var property in req.body){
            usuario[property] = req.body[property];
        }
        usuario.save(function(err, usuario){

            //if(err) return next(err);
            if(err) console.log(err);
            console.log("usuario guardado");
            res.json({success: true});
        });
    };
    
    return UsuariosApi;
})();

module.exports = UsuariosApi;