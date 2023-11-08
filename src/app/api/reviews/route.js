import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";


// export async function GET(request) {
//   const loggedInData = await checkLoggedIn();
//   if (loggedInData.loggedIn) {
//     const todos = await prisma.toDo.findMany({
//       where: {
//         ownerId: {
//           equals: loggedInData.user?.id
//         }
//       }
//     });
//     return NextResponse.json(todos);
//   }
//   return NextResponse.json({error: 'not signed in'}, {status: 403});
// }


// returns the listingId of a placeId, (creates a new Listing if there is no listing with that placeId)
async function getListingId(placeId) {
  const listingId = await prisma.listing.findUnique({
    where: {
      placeId: placeId, 
    }, 
    select: {
      id: true, 
    }
  });

  // if a Listing with the placeId exists, return its id
  if (listingId != null) {
    return listingId["id"];
  }

  // otherwise, create a new Listing and return its id
  const newListingId = await prisma.listing.create({
    data: {
      placeId: placeId, 
    }, 
    select: {
      id: true, 
    }
  });
  return newListingId["id"];
}


// returns the seasonId of seasonName, or null if there is no season with that name
async function getSeasonId(seasonName) {
  const seasonId = await prisma.season.findUnique({
    where: {
      name: seasonName, 
    }, 
    select: {
      id: true, 
    }
  });
  if ("id" in seasonId) {
    return seasonId["id"];
  }
  return null;
}


// request should have placeId, seasonName, and score
export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (!loggedInData.loggedIn) {
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }

  let data;
  try {
    data = await request.json();
  }
  catch(error) {
    console.error(error);
    return NextResponse.json({error: error}, {status: 500}, {data: request});
  }
  const {placeId, seasonName, score} = data;

  const listingId = await getListingId(placeId);
  const seasonId = await getSeasonId(seasonName);
  if (seasonId === null) {
    return NextResponse.json({error: `season ${seasonName} does not exist`}, {status: 500});
  }
  if (!Number.isInteger(score)) {
    return NextResponse.json({error: `score ${score} is not an Integer`}, {status: 500});
  }

  const review = await prisma.review.create({
    data: {
        userId: loggedInData.user?.id, 
        listingId: listingId, 
        seasonId: seasonId, 
        score: score, 
    }
  })
  return NextResponse.json(review);
}


// export async function DELETE(request) {
//   const loggedInData = await checkLoggedIn();
//   if (loggedInData.loggedIn) {
//     const index = await request.json();
//     const deleteTodo = await prisma.toDo.delete({
//       where: {
//         id: {
//           equals: index
//         }
//       }, 
//     });
//     return NextResponse.json(index);
//   }
//   return NextResponse.json({error: 'not signed in'}, {status: 403});
// }


// export async function PATCH(request) {
//   const loggedInData = await checkLoggedIn();
//   if (loggedInData.loggedIn) {
//     const { idx, isDone } = await request.json();
//     const updateTodo = await prisma.toDo.update({
//       where: {
//         id: idx
//       }, 
//       data: {
//         done: isDone
//       }, 
//     });
//     return NextResponse.json(isDone);
//   }
//   return NextResponse.json({error: 'not signed in'}, {status: 403});
// }
