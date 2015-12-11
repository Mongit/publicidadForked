(function() {
    var app = angular.module('app');
    
    app.factory('mapFactory', ['$location',function($location) {//singleton.
        
        var MapClass = function(latitud,longitud) {
            this.map = undefined;
            this.lat = latitud || 19.4096;
            this.long = longitud || -102.0520;
            this.myCenter=new google.maps.LatLng(this.lat, this.long);
            this.markersArray = [];
            this.mapOptions = {
                center:this.myCenter,
                zoom:13,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            this.document = document.getElementById("googleMap")
            this.map = this.getMap();
            this.eventListener = undefined;
        };
        MapClass.prototype.getMap = function(){
            var that = this;
            return new google.maps.Map(that.document, that.mapOptions);
        };
        MapClass.prototype.getEventListener = function(){
            var that = this;
            that.eventListener = google.maps.event.addListener(that.map, 'click', function(event){ 
                that.manageEvent(event);
            });
        };
        MapClass.prototype.manageEvent = function(event){
            var that = this;
            that.lat = event.latLng.lat();//guardar latitud.
            that.long = event.latLng.lng();
            that.clearOverlays();
            that.placeMarker(event.latLng.lat(), event.latLng.lng());
        };
        MapClass.prototype.clearOverlays = function () {
            var that = this;
            for (var i = 0; i < that.markersArray.length; i++ ) {
                that.markersArray[i].setMap(null);
            }
        };
        MapClass.prototype.placeMarker = function (latitud,longitud) {
            var that = this;
            var myMarkerPosition = undefined;
            myMarkerPosition = new google.maps.LatLng(latitud,longitud);
            
            var marker = new google.maps.Marker({
                position: myMarkerPosition,
                map: that.map,
            });
            that.markersArray.push(marker);
            /*var infowindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + latitud + '<br>Longitude: ' + longitud
            });
            infowindow.open(that.map, marker);*/
        };
        MapClass.prototype.borrarMarker = function () {
            var that = this;
            that.lat = undefined;
            that.long = undefined;
            that.clearOverlays();
            that.markersArray = [];
        };

        MapClass.prototype.getLat = function () {
            var that = this;
            return that.lat;
        };
        MapClass.prototype.getLong = function () {
            var that = this;
            return that.long;
        };
        
        return function(latitud,longitud) {
            return new MapClass(latitud,longitud);
        };
        
    }]);
})();
