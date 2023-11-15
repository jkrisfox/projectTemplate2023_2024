"use client"

// pages/search.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; // Import db from your firebase config

const SearchPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      // Only perform search when the router is ready
      if (router.isReady) {
          // Access the query parameter directly, now that we know it is defined
          const searchQuery = router.query.query; // Assuming your query parameter is named 'query'

          if (searchQuery) {
              performSearch(searchQuery);
          }
      }
  }, [router.isReady, router.query]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("title", "==", searchTerm));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(results); // This will log the fetched data to the console
        setSearchResults(results);
    } catch (error) {
        console.error("Error fetching search results: ", error);
    }
    setLoading(false);
};


  return (
      <div>
          {loading ? (
              <p>Loading...</p>
          ) : (
              <div>
                  <h1>Search Results</h1>
                  {searchResults.map((result) => (
                      <div key={result.id}>
                          <h2>{result.title}</h2>
                          {/* Render other fields from result as needed */}
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
};

export default SearchPage;