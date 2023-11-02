import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function PUT(request, { params }) {
  const loggedInData = await checkLoggedIn();
  const userId = parseInt(params.id);

  // Check if logged in
  if (!(loggedInData.loggedIn && userId)) {
    return NextResponse.json({error: 'not signed in'}, {status: 401});
  }

  // Only let a user update their own account
  if (loggedInData.user.id != userId) {
    return NextResponse.json({error: 'you may not edit this profile'}, {status: 403});
  }

  const { name, phoneNumber, location } = await request.json();
  
  // Validate name
  if (!name) {
    return NextResponse.json({error: 'the name field must be supplied'}, {status: 400});
  }

  if (name.length > 64) {
    return NextResponse.json({error: 'name is too long'}, {status: 400});
  }

  if (phoneNumber) {
    // Validate phone number
    const numberIsValid = phoneNumber.match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    if (!numberIsValid) {
      return NextResponse.json({error: 'phone number is incorrectly formatted'}, {status: 400});
    }

    if (phoneNumber.length > 16) {
      return NextResponse.json({error: 'phone number is too long'}, {status: 400});
    }
  }

  // Validate location
  if (location && (location.length > 64)) {
    return NextResponse.json({error: 'location is too long'}, {status: 400});
  }


  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        phoneNumber,
        location
      }
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({error: 'record not found'}, {status: 404});
  }
}
