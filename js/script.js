/*jslint browser: true*/
/*jslint devel: true */
/*global $, jQuery*/

$(document).ready(function () {
    "use strict";
    
    var lat, lon, weather, icon, desc, city, temp, country;
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather, showError);
        } else {
            $("#title").html("Can't get location.");
        }
    }
    
    function getWeather(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon,
            function getDetails(json) {
                city = json.name;
                country = json.sys.country;
                icon = json.weather[0].icon;
                desc = json.weather[0].main;
                temp = json.main.temp;
            });
        $(document).ajaxComplete(function () {
            $("#title").html(city + ", " + country);
            $("#icon-box").html("<img alt='weather icon' class='img-responsive' src='" + icon + "'>");
            $("#description").html(desc);
            $("#temp").html(temp + '&deg C');
        });
    }
    
    function showError() {
        
    }
                  
    getLocation();
});