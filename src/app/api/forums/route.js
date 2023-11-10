import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { USER_NOT_SIGNED_IN } from "@/lib/response";
import { checkLoggedIn } from "@/lib/auth"

/* 
  postTitle       String
  postDescription String
  authorId        Int
  author          User          @relation(fields: [authorId], references: [id])
*/

export async function POST(request) {
  // const loggedInData = await checkLoggedIn(); // check user sign in
  if (true) {
        // if user is logged in, then create the event if needed
        const responseData = await request.json();
        const { postTitle, postDescription} = responseData;
        // create data layout for post creation
        const postData = {
          postTitle: postTitle,
          postDescription: postDescription,
          authorId: 1, // change this to something more dynamic
        };
        console.log(postData);
        let events;
        try {
          events = await prisma.Post.create({ data: postData });
        } catch (e) {
          console.log(e);
          return NextResponse.json({ error: e.message }, { status: 500 });
        }
        console.log(JSON.stringify(postData, null, 2));
        return NextResponse.json(postData);
  }
  return USER_NOT_SIGNED_IN;
}

export async function GET(request) {
  // send in GET request as query in URL
  // const loggedInData = await checkLoggedIn();
  if (true) {
    const searchParams = request.nextUrl.searchParams;
    // Get all 'filters' query parameters as an array
    let filters = searchParams.getAll('filters');
    filters = filters.map((value) => parseInt(value))
    let allPost;
    try {
      if (filters.length > 0) {
        // Query: return all events where at least one post (some) has the filtered option ordered
        // by startTime; meaning, the earliest go first.
        allPost = await prisma.Post.findMany({
          where: {
            PostFilters: {
              some: {
                possibleFilterId: {
                  in: filters,
                },
              },
            },
          },
          // include everything since you're going to parse and create post
          include: {
            Comment: true,
            _count: {
              select: {
                Votes: {
                  where: {type: UPVOTE}
                }
              }
            },
            _count: {
              select: {
                Votes: {
                  where: {type: DOWNVOTE}
                }
              }
            },
            Comment: true
          },
          orderBy: {
            createdAt: "desc", // order by newest
          },
        });
      } else {
        // if no filter, return everything
        allPost = await prisma.Post.findMany();
      }
    } catch (e) {
      console.log(e.message)
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    console.log(JSON.stringify(allPost, null, 2)); // simple logger that logs out all the events and the filters
    return NextResponse.json(allPost);
  }
  return USER_NOT_SIGNED_IN;
}
