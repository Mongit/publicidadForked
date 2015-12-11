var Copy = (function() {
    var Copy = function() {
    };
    Copy.prototype.copyBodyToEmpresa = function(body, empresa){
        console.log("entŕo a copy");
        var empresa = empresa;
        empresa.nombre = body.nombre;
        empresa.logotipo = body.logotipo;
        empresa.foto = body.foto;
        empresa.textoIntro = body.textoIntro;
        empresa.lat = body.lat;
        empresa.long = body.long;
        empresa.descripcion = body.descripcion;
        empresa.horario = body.horario;
        empresa.encargado = body.encargado;
        empresa.tel = body.tel;
        empresa.face = body.face;
        empresa.email = body.email;
        empresa.productos = body.productos;
        empresa.nota = body.nota;
        empresa.direccion={
            numero: body.numero,
            numeroInt: body.numeroInt,
            calle: body.calle,
            colonia: body.colonia,
            cp: body.cp,
            municipio: body.municipio,
            estado: body.estado
        };
        empresa.rubro={
            rubro: body.rubro
        };
        empresa.informacion={
            noContrato: body.noContrato,
            uniquename: body.uniquename,
            cliente: body.cliente,
            telCliente: body.telCliente,
            correoCliente: body.correoCliente,
            fechaContrato: body.fechaContrato||Date.now(),
            fechaVencimiento: body.fechaVencimiento||Date.now(),
            pago: body.pago
        };
        return empresa;
    };

    return Copy;
})();

module.exports = new Copy(); 