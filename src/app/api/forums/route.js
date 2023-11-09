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

export async function POST() {
  const loggedInData = await checkLoggedIn(); // check user sign in
  if (loggedInData.checkLoggedIn) {
        // if user is logged in, then create the event if needed
        const responseData = await request.json();
        const { postTitle, postDescription,authorId } =
          responseData;
        const eventData = {
          eventName: eventName,
          location: location,
          startTime: startTime,
          endTime: endTime,
          maxAttendee: maxAttendee,
          hostId: 1, // change this to something more dynamic
          EventFilter: {
            // add filters to the events and connect them to existing possible filters
            create: filterIds.map((id) => ({
              possibleFilter: {
                connect: {
                  id: id,
                },
              },
            })),
          },
        };
        console.log(eventData);
        let events;
        try {
          events = await prisma.Event.create({ data: eventData });
        } catch (e) {
          console.log(e);
          return NextResponse.json({ error: e.message }, { status: 500 });
        }

  }
  return USER_NOT_SIGNED_IN;
}