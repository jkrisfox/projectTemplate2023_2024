import React, { useState, useEffect } from 'react';

export default function MapWithMarker({ onMarkerPlaced }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);

  useEffect(() => {
    if (!map) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.299878, lng: -120.662337 },
        zoom: 14,
      });

      // Add click event listener to the map
      mapInstance.addListener('click', (event) => {
        // If a marker is already placed, do nothing
        if (markerPlaced) {
          return;
        }
        // Remove the previous marker if exists
        if (marker) {
          marker.setMap(null);
        }
        // Place a new marker
        placeMarker(event.latLng, mapInstance);
      });

      setMap(mapInstance);
    }
  }, [map, marker, markerPlaced]);

  // Function to place a marker on the map
  const placeMarker = (location, mapInstance) => {
    // Create a new marker at the clicked location
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: mapInstance,
      draggable: true, // Allow dragging the marker
    });

    // Add click event listener to the marker
    newMarker.addListener('click', () => {
      const markerPosition = newMarker.getPosition(); // Get marker position
      // Use the geocoder to get the address from LatLng
      getAddressFromLatLng(markerPosition).then((address) => {
        alert(`Marker Clicked!\nAddress: ${address}`);
      });
    });

    // Invoke the callback with marker position
    onMarkerPlaced(newMarker.getPosition().toJSON());
    // Set the new marker to state
    setMarker(newMarker);
    setMarkerPlaced(true); // Mark the flag as true after placing the marker
  };

  // Function to get address from LatLng
  const getAddressFromLatLng = (latLng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  };

  return <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>;
}
