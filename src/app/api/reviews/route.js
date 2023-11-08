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


function getListingId(placeId) {
  const listingId = prisma.listing.findUnique({
    where: {
      placeId: placeId, 
    }, 
    select: {
      id: true, 
    }
  });
  // if a Listing with the placeId exists, return its id
  if (listingId != NULL) {
    return listingId;
  }

  // otherwise, create a new Listing and return its id
  const newListingId = prisma.listing.create({
    data: {
      placeId: placeId, 
    }, 
    select: {
      id: true, 
    }
  });
  return newListingId;
}


function getSeasonId(seasonName) {
  const seasonId = prisma.season.findUnique({
    where: {
      name: seasonName, 
    }, 
    select: {
      id: true, 
    }
  });
  return seasonId;
}


// request should have placeId, seasonName, and score
export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (!loggedInData.loggedIn) {
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }

  try {
    const { placeId, seasonName, score } = await request.json();
  }
  catch(error) {
    console.error(error);
    return NextResponse.json({error: error}, {status: "error"}, {data: request});
  }

  seasonId = getSeasonId(seasonName);
  if (seasonId === NULL) {
    return NextResponse.json({error: `season ${seasonName} does not exist`}, {status: "error"});
  }
  if (!Number.isInteger(score)) {
    return NextResponse.json({error: `score ${score} is not an Integer`}, {status: "error"});
  }

  const review = await prisma.review.create({
    data: {
        userId: loggedInData.user?.id, 
        listingId: getListingId(placeId), 
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
