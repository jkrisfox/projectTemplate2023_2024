'use client'

import Map from 'src/app/map.js';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MapWithMarker from 'src/app/marker/page.js';


export default function Review() {
  const [rating, setRating] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerAddress, setMarkerAddress] = useState(null);
  const pathname = usePathname();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleMarkerPlacement = (position) => {
    setMarkerPosition(position);
    // Use the geocoder to get the address from LatLng
    getAddressFromLatLng(position).then((address) => {
      setMarkerAddress(address);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if a review has already been submitted and marker is placed
    if (reviewSubmitted) {
      alert('You cannot submit more than one review.');
    } else if (!markerPosition) {
      alert('Please select a location on the map.');
    } else {
      // Handle the form submission logic here, including markerPosition and markerAddress
      console.log('Rating submitted:', rating);
      console.log('Marker position:', markerPosition);
      console.log('Marker address:', markerAddress);
      
      // After successful submission, set reviewSubmitted to true
      setReviewSubmitted(true);
    }
  };

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

  return (
    <>
      <h1>Leave a Review</h1>
      <div>
        <Link href="/">Back to Home</Link>
        <MapWithMarker onMarkerPlaced={handleMarkerPlacement} />
        {reviewSubmitted ? (
          <p>Your review has been submitted!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Rating (1-10):
              <input
                type="number"
                value={rating}
                onChange={handleRatingChange}
                min="1"
                max="10"
              />
            </label>
            {markerAddress && <p>Selected Address: {markerAddress}</p>}
            <button type="submit">Submit Review</button>
          </form>
        )}
      </div>
    </>
  );
}
