import { useState, useEffect } from 'react';

export default function MapWithMarker({ onMarkerPlaced }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.299878, lng: -120.662337 },
        zoom: 14,
      });

      // Add click event listener to the map
      mapInstance.addListener('click', (event) => {
        placeMarker(event.latLng); // Call placeMarker function when map is clicked
      });

      setMap(mapInstance);
    }
  }, [map]);

  // Function to place a marker on the map
  const placeMarker = (location) => {
    // Remove the existing marker if any
    if (marker) {
      marker.setMap(null);
    }

    // Create a new marker at the clicked location
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map,
      draggable: true, // Allow dragging the marker
    });

    // Update the marker state and pass the marker position to the parent component
    setMarker(newMarker);
    onMarkerPlaced(location); // Call the callback function with the marker position
  };

  return <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>;
}
