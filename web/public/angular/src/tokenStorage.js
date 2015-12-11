(function() {
    var app = angular.module("app");
    
    app.factory("tokenStorage", ['$window', function($window) {        
        return {        
            getToken: function() {
                var json = $window.localStorage.getItem('objToken');            
                if (json) return JSON.parse(json);

                return undefined;
            },

            setToken: function (data) {
                $window.localStorage.setItem('objToken', JSON.stringify(data));
            },

            clearToken: function () {
                $window.localStorage.setItem('objToken', '');
            },

            getAccessHeader: function() {
                var that = this;
                var tokenObj = that.getToken();
                if (tokenObj) {
                    return tokenObj.token;
                }
                return '';
            },
            getEmail: function() {
                var that = this;
                var tokenObj = that.getToken();
                if (tokenObj) {
                    return tokenObj.user.email;
                }
                return 'No hay email';
            },
            getId: function() {
                var that = this;
                var tokenObj = that.getToken();
                if (tokenObj) {
                    return tokenObj.user._id;
                }
                return 'No hay _id';
            }
        };
    }]);
    
})();