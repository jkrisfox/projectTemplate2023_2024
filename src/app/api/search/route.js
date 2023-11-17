// src/app/api/search.js

import { NextResponse } from "next/server";
import { query, collection, where, getDocs } from "firebase-admin/firestore";
import { db } from "../../../../firebase/firebaseAdminConfig"; // Import db directly from firebaseAdminConfig

export async function GET(request) {
  // Retrieve the search query from the request URL
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query");

  if (!searchQuery) {
    return NextResponse.json(
      { error: "No search query provided" },
      { status: 400 }
    );
  }

  // Convert the search query to lowercase for case-insensitive comparison
  const searchQueryLower = searchQuery.toLowerCase();

  // Perform separate queries for title and description
  const titleQuery = query(
    listingsRef,
    where("title_lower", ">=", searchQueryLower),
    where("title_lower", "<=", searchQueryLower + "\uf8ff")
  );

  const descriptionQuery = query(
    listingsRef,
    where("description_lower", ">=", searchQueryLower),
    where("description_lower", "<=", searchQueryLower + "\uf8ff")
  );

  try {
    // Use Promise.all to perform both queries in parallel
    const [titleQuerySnapshot, descriptionQuerySnapshot] = await Promise.all([
      getDocs(titleQuery),
      getDocs(descriptionQuery),
    ]);

    // Merge the results from both queries
    const titleListings = titleQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const descriptionListings = descriptionQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const combinedListings = [...titleListings, ...descriptionListings];

    // Remove duplicates from combinedListings if any
    const uniqueListings = Array.from(
      new Map(combinedListings.map((item) => [item.id, item])).values()
    );

    // At the end of your GET function, before returning the response
    console.log("Fetched Listings: ", uniqueListings);
    return NextResponse.json(uniqueListings);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}
