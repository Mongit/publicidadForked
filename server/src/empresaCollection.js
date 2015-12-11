var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validation = require("./validation");
var direccionSchema = require("./dirSchema.js");
var rubroSchema = require("./rubroSchema.js");
var informacionSchema = require("./infoSchema.js");

var empresaSchema = mongoose.Schema({
    nombre: validation.validateCampo(true,String,5,40,"validateNombre"),
    logotipo: String, 
    foto: String, 
    textoIntro: validation.validateCampo(false,String,null,180), 
    lat: String, 
    long: String, 
    descripcion: validation.validateCampo(false,String,null,180), 
    horario: { type: String, required: true,  maxlength: 100 }, 
    encargado: validation.validateCampo(true,String,5,40,"validateNombre"),
    tel: validation.validateCampo(true,String,5,15,"validateTel"),
    face: { type: String, maxlength: 20}, 
    email: validation.validateCampo(true,String,null,null,"validateEmail"),
    productos: validation.validateCampo(false,Array,null,null,"validateProductos"),
    nota: { type: String, maxlength: 180}, 
    direccion: direccionSchema,
    rubro: rubroSchema,
    informacion: informacionSchema,
});

module.exports = mongoose.model('Empresa', empresaSchema);

