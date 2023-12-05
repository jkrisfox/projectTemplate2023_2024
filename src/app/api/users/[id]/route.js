import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { USER_NOT_SIGNED_IN } from "@/lib/response";
import { checkLoggedIn } from "@/lib/auth"

export async function GET(request) {
  // authenticate the user before returning the informations
  const loggedInData = await checkLoggedIn();
  const searchParams = request.nextUrl.searchParams;
  console.log("searchParam", searchParams)
  const userId = parseInt(searchParams.get("id"));
  if (loggedInData.loggedIn) {
    // find unique user that has the session id
    let user;
    const checkUserById = userId ?? loggedInData.user.id;
    console.log("checkUserById", checkUserById)
    try {
      // check if it's an actual in the param or not:
      if (!isNaN(checkUserById)) {
        user = await prisma.User.findUnique({
          where: {
            id: checkUserById
          },
          select: {
            name: true,
            shortBio: true,
            ProfileImage: true,
            gymFrequency:true,
            status: true,
            email: true,
            HostEvents: true,
            EventAttendee: true,
            Post: true
          }
        });
      }
      else{
        user = {error: "NaN id"}
      }
    }
    catch (e) {
      console.log(e.message)
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    console.log(user)
    return NextResponse.json(user);
  }
  return USER_NOT_SIGNED_IN;
}