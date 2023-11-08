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
  const pathname = usePathname();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleMarkerPlacement = (position) => {
    setMarkerPosition(position);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if a review has already been submitted and marker is placed
    if (reviewSubmitted) {
      alert('You cannot submit more than one review.');
    } else if (!markerPosition) {
      alert('Please select a location on the map.');
    } else {
      // Handle the form submission logic here, including markerPosition
      console.log('Rating submitted:', rating);
      console.log('Marker position:', markerPosition);
      
      // After successful submission, set reviewSubmitted to true
      setReviewSubmitted(true);
    }
  };

  return (
    <>
      <h1>Leave a Review</h1>
      <div>
      <Link href="/">
        Back to Home
        </Link>
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
          <button type="submit">Submit Review</button>
        </form>
        )}
      </div>
    </>
  );
}
