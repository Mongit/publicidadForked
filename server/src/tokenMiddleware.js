var TokenMiddleware = (function() {
    var TokenMiddleware = function(models, jwt) {
        this.models = models;
        this.jwt = jwt.module;
    };
    
    TokenMiddleware.prototype.validate = function(req, res, next) {
        var that = this;

        var token =  
            (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            (req.headers['x-access-token']);
        console.log(token);

        if (token) {
            try {
                var decoded = that.jwt.decode(token, 'cualquiera');
                if(decoded.exp <= Date.now()) {
                    res.status(401).send('Access token has expired');
                }

                var user = that.models.usuario.find(decoded.iss);
                req.user = user;
                return next();
            } catch (err) {
                res.status(401).send('Invalid token');
            }
        } else {
            res.status(401).send('No token');
        }
    };
    
    return TokenMiddleware;
})();

module.exports = TokenMiddleware;