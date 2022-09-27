//Not sure if these count as global variables, but that was the idea behind setting them outside the functions
var location;
var map;
var marker;

var markerOptions2;
var marker2;

function initMap() {

    let location = {lat: 38.6747084, lng: -77.3149437};
    let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: location
    })

    //Add first custom marker to map  
    var marker = new google.maps.Marker({
        position: location,
        icon: './Map_API_Test_Files/Images/Incident_Tick.png',
        map: map
    })

    //Add second custom marker to map.  Slightly different method than the first marker
    let markerOptions2 = {
        position: new google.maps.LatLng(38.675424, -77.316762),
        icon: './Map_API_Test_Files/Images/Incident_Coyote.png',
        map: map
    }

    let marker2 = new google.maps.Marker(markerOptions2);
    marker2.setMap(map);
}

function AddMarkerToMap(xcoord, ycoord)
{
    /* These statements remove the marker from map and destroy the marker object,
    but I have only been able to get them to work when they are in the initMap() function
    marker.setMap(null);
    marker = null; 
    */

    //let location2 = {lat: xcoord, lng: ycoord}; //Another way to supply coordinates to the "position" property of markerOptions
    //alert(location2.lat + ", " + location2.lng);

    let markerOptions2 = {
        position: new google.maps.LatLng(xcoord, ycoord),
        map: map
    }

    let marker2 = new google.maps.Marker(markerOptions2);

    marker2.setMap(map);

    //alert("finished"); //making sure the function runs successfully
}

function test()
{
    alert("testing");
}
