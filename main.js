var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.8781, lng: -87.6298},
        zoom: 15
    });
    map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
}