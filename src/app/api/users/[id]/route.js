import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request, { params }) {
  const userId = parseInt(params.id);
  
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (user) {
    return NextResponse.json(user);
  }

  return NextResponse.json({error: 'user not found'}, {status: 404});
}

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

  const data = await request.formData();
  const name = data.get('name');
  const phoneNumber = data.get('phoneNumber');
  const location = data.get('location');
  const profileImage = data.get('profileImage');
  const heroImage = data.get('heroImage');
  console.log(data);

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

  // Validate files
  let profileImageName, heroImageName;
  
  if (profileImage) {
    if (profileImage.size > 1000000) {
      return NextResponse.json({error: 'Profile image is more than 1 MB large'}, {status: 413});
    }

    if (!profileImage.name.match(/^[\w -]+.(jpeg|jpg|png)$/)) {
      return NextResponse.json({error: 'Profile image has an invalid extension. Allowed: jpeg, jpg, png'}, {status: 400});
    }

    profileImageName = crypto.randomUUID() + '.' + profileImage.name.split('.').pop();
  }

  if (heroImage) {
    if (heroImage.size > 1000000) {
      return NextResponse.json({error: 'Banner image is more than 1 MB large'}, {status: 413});
    }

    if (!heroImage.name.match(/^[\w -]+.(jpeg|jpg|png)$/)) {
      return NextResponse.json({error: 'Banner image has an invalid extension. Allowed: jpeg, jpg, png'}, {status: 400});
    }

    heroImageName = crypto.randomUUID() + '.' + heroImage.name.split('.').pop();
  }

  // Make sure we have credentials before sending any requests
  const username = process.env.FILEHOST_USERNAME;
  const password = process.env.FILEHOST_PASSWORD;

  if (!username || !password) {
    console.error("missing file host credentials");
    return NextResponse.json({error: 'server is unable to handle requests, try again later'}, {status: 500});
  }

  let response;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        phoneNumber,
        location,
        profileImageName,
        heroImageName
      }
    });

    response = NextResponse.json(user);
  } catch {
    return NextResponse.json({error: 'record not found'}, {status: 404});
  }

  // Set up auth headers
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(username + ":" + password).toString('base64'));

  // Upload profile image
  if (profileImage) {
    fetch(`http://slomarket.shnibl.com:5000/${profileImageName}`, {
      method: 'put',
      body: profileImage,
      headers
    }).then((res) => {
      if (!res.ok) {
        console.error("error when uploading profile image, status:", res.status);
        response = NextResponse.json({error: 'server could not upload profile image'}, {status: 500});
      }
    });
  }

  // Upload banner image
  if (heroImage) {
    fetch(`http://slomarket.shnibl.com:5000/${heroImageName}`, {
      method: 'put',
      body: heroImage,
      headers
    }).then((res) => {
      if (!res.ok) {
        console.error("error when uploading banner image, status:", res.status);
        response = NextResponse.json({error: 'server could not upload banner image'}, {status: 500});
      }
    });
  }

  return response;
}
