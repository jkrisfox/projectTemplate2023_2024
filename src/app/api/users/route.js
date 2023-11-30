import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
import { USER_NOT_SIGNED_IN } from "@/lib/response";
import { checkLoggedIn } from "@/lib/auth"

export async function POST(request) {
  /**
   * Overview: take in a request from a form and 
   */
  const responseData = await request.json();
  const { name, email, password } = responseData;
  if (name && email && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
      user = await prisma.user.create({
        data: { 
          name: name, 
          password: hashedPassword,
          email: email
        }
      });
    } catch (e) {
      console.log(e.message);
      return NextResponse.json({error: e.message}, {status: 500 })
    }
    return NextResponse.json(user);
  }
  return USER_NOT_SIGNED_IN;
}

export async function GET(request) {
  // authenticate the user before returning the informations
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    // find unique user that has the session id
    let user;
    try {
      user = await prisma.User.findUnique({
        where: {
          id: loggedInData.user.id
        }
      });
    }
    catch (e) {
      return NextResponse.json({ error: "Invalid User Id Provided" }, { status: 500 });
    }
    console.log(user)
    return NextResponse.json(user);
  }
  return USER_NOT_SIGNED_IN;
}

export async function PUT(request) {
  // delete events and cascade delete all the event attendees
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    const responseData = await request.json();
    const userId = loggedInData.user.id;
    const {
      name, shortBio, status, ProfileImage
    } = responseData;
    const eventData = {
      name, shortBio, status, ProfileImage
    };
    try {
      updatedEvent = await prisma.Event.update({
        where: {
          id: userId,
        },
        data: eventData,
      });
    } catch (e) {
      console.log(e.message);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json(updatedEvent);
  }
  return USER_NOT_SIGNED_IN;
}
