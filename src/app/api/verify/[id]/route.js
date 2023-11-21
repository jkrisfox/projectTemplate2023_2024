import { NextResponse } from "next/server";
import { db, auth } from '../../../../../firebase/firebaseAdminConfig';

export async function PUT(request, { params }) {
  const userId = params.id;
  let response;

  // Verify student status if user has a verified calpoly.edu email
  await auth.getUser(userId).then(async (user) => {
    if (user.emailVerified && (user.email.split('@').pop() == "calpoly.edu")) {
      // Update user document
      await db.collection("users").doc(userId).update({
        isStudent: true
      }).then(async () => {
        // Give user the student claim
        await auth.setCustomUserClaims(userId, { student: true }).then(() => {
          response = NextResponse.json({message: 'verified student'}, {status: 200});
        }).catch(err => {
          response = NextResponse.json({error: `could not verify user: ${err.message}`}, {status: 500});
        });
      }).catch(err => {
        response = NextResponse({error: `could not update user: ${err.message}`}, {status: 500})
      });
    } else {
      response = NextResponse.json({error: 'the user does not have a verified calpoly email'}, {status: 403});
    }
  }).catch(err => {
    response = NextResponse.json({error: `could not get user: ${err.message}`}, {status: 404});
  });

  return response;
}