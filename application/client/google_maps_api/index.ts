// Initialize and add the map
function initMap(): void {
  // The location of ODU
  const odu = { lat: 36.8862699, lng: -76.3097248 };
  // The map, centered at ODU
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 15,
      center: odu,
    }
  );

  // The marker, positioned at ODU
  const marker = new google.maps.Marker({
    position: odu,
    map: map,
  });
}


  interface Window {
    initMap: () => void;
  }

window.initMap = initMap;