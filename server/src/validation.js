var Validation = (function() {
    var Validation = function() {
        this.float = {validator: /^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/, msg: 'Este campo sólo número o números con decimales'};
        this.letrasEspaciosAcentos = {validator: /^[A-Za-záéíóú ]+$/, msg: 'Este campo sólo acepta letras y espacios'};
        this.numeros = {validator: /^[0-9]*$/, msg: 'Este campo sólo acepta numeros'};
        this.email = {validator: /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/, msg: 'Este campo sólo acepta correos válidos'};
        this.productos = function(val) {
            if (val && val.length <= 10){
                return true;
            }
            return false;
        };
        this.uniquenameRegex = {
            validator: /^[a-zA-Z0-9]+$/, 
            msg: 'Este campo sólo acepta números, mayúsculas y minúsculas, sin espacios ni acentos.'
        };
    };
    Validation.prototype.validateCampo = function(req, type, min, max, nameArr){
        var arrValidation = this.getArrValidation(nameArr);
        var obj = { 
            type: type, 
            required: req,
            minlength: min,
            maxlength: max,
            validate: arrValidation
        };
        return obj;
    };
    Validation.prototype.getArrValidation = function(nameArr){
        switch (nameArr) {
            case "validateNombre":
                return [this.letrasEspaciosAcentos];
                break;
            case "validateTel":
                return [this.numeros];
                break;
            case "validateEmail":
                return [this.email];
                break;
            case "validateProductos":
                return [this.productos];
                break;
            case "validateColonia":
                return [this.letrasEspaciosAcentos];
                break;
            case "validateCp":
                return [this.numeros];
                break;
            case "validateMunicipio":
                return [this.letrasEspaciosAcentos];
                break;
            case "validateEstado":
                return [this.letrasEspaciosAcentos];
                break;
            case "validateRubro":
                return [this.letrasEspaciosAcentos];
                break;        
            case "validateContrato":
                return [this.numeros];
                break;
            case "validatePago":
                return [this.float];
                break;
            default:
                return [];
        };
    };
    return Validation;
})();

module.exports = new Validation(); 