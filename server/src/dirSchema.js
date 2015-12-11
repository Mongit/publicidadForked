var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validation = require("./validation");

var direccionSchema = mongoose.Schema({
    numero: { type: String, maxlength: 5 },
    numeroInt: { type: String, maxlength: 5 },
    calle: { type: String, required: true, maxlength: 40 },
    colonia: validation.validateCampo(true,String,null,30,"validateColonia"),
    cp: validation.validateCampo(true,String,5,5,"validateCp"),
    municipio: validation.validateCampo(true,String,5,20,"validateMunicipio"),
    estado: validation.validateCampo(true,String,5,20,"validateEstado"),
});

module.exports = direccionSchema;
