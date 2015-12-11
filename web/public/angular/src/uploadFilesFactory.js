(function() {
    var app = angular.module('app');
    
    app.factory('uploadFilesFactory', ['Upload', function(Upload) {//singleton.
        
        var UploadFiles = function() {
        }
        
        UploadFiles.prototype.upload = function (files, errFiles, propertyName, ctrl) {
            var callback = function (response) {
                ctrl[propertyName] = response.data;
            };
            var error = function (response) {
                if (response.status > 0) {
                    ctrl.errorMsg[propertyName] = response.status + ': ' + response.data;
                }
            };
            var progres = function (evt) {
                ctrl.progress = { [propertyName] : 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total)) };
            }
            if (files && files.length) {
                Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {
                        files: files
                    }
                }).then(callback,error,progres);
            }
        };       
        return function() {
            return new UploadFiles();
        };
        
    }]);
})();