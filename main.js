var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.7684, lng: -86.1581},
        zoom: 12
    });
    map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
}