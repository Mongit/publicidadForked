(function() {
    var app = angular.module("app");
    
    app.factory("httpInterceptor", ['$q', '$location', 'tokenStorage', function($q, $location, tokenStorage) {//singleton function.

        
        //"/".indexOf("/paginas/privada/borrar/****") !== 0
        //var re = //;
        
        
        var freeAccesPages = ['/', '/signin', '/signup', '/todosPublica', '/about', '/contact'];
        
        return {
            
            // optional method
            'request': function(request) {
                var url = $location.path();
                var negocio = url.indexOf("/negocio/");
                if(negocio == 0){
                   freeAccesPages.push(url);
                };
    
                // if is not listed in the freeAccessPages array
                if (freeAccesPages.indexOf($location.path()) === -1) {
                    var tokenObj = tokenStorage.getToken();

                    if (tokenObj === undefined){   
                        $location.path('/signin');    
                    }
                }
                           
                //set 'x-access-token' header
                request.headers['x-access-token'] = tokenStorage.getAccessHeader();
                
                return request;
            },

            // optional method
            'requestError': function(rejection) {
                return $q.reject(rejection);//es una promesa, se ejecuta la función reject y se le manda un objeto rejection, esto equivale a ejecutar la función que es el segundo parametro del then  en la promesa.
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    $location.path('/signin');
                }
                
                return $q.reject(rejection);
            }
        };
        
    }]);
    
})();