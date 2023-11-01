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
