// src/app/api/search.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { checkLoggedIn } from '@/lib/auth';

export async function GET(request) {
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    // Retrieve the search query from the request URL
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('query');

    if (!searchQuery) {
      return NextResponse.json({ error: 'No search query provided' }, { status: 400 });
    }

    // Use Prisma to search the listings
    const listings = await prisma.listing.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } }
        ],
      },
      include: {
        user: true, // Include user information if needed
        category: true,
      }
    });

    return NextResponse.json(listings);
  }

  return NextResponse.json({ error: 'Not signed in' }, { status: 403 });
}

// Note: No POST method is needed for search functionality unless you are storing search queries
