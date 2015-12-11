var ImagenesApi = (function() {
    var ImagenesApi = function(models, imagenFactory, fs) {
        this.models = models;
        this.imagenFactory = imagenFactory;
        this.fs = fs.module;
    };
    //curl -i -H "Content-Type: application/json" -d '{ "username": "rodrigo", "password": "test", "id": 1 }' http://localhost:3000/imagenes/api/post
    ImagenesApi.prototype.serialize = function(req, res, next){
        console.log("entró al endpoint");
        var that = this;
        var bufs = [];
        var serialized = [];
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            file.on('data', function(data) {//data is type stream, ver si se puede agregar directo a imagen.imagen.data.
                bufs.push(data);
            });
            
            file.on('end', function() {
                var arr = Buffer.concat(bufs);
                serialized = arr.toString("base64");
            });
        });
        req.busboy.on('finish', function(){
           console.log("se ejecutó el evento finish");
            res.json(serialized);
        })
        req.pipe(req.busboy);
    };
    return ImagenesApi;
})();

module.exports = ImagenesApi; 