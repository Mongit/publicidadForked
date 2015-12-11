var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validation = require("./validation");

var rubroSchema = mongoose.Schema({
    rubro: validation.validateCampo(true,String,5,40,"validateRubro"),
});

module.exports = rubroSchema;
