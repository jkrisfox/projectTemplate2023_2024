// model Friendship {
//   // model different friendship relationships using User1 -> User2 model 
//   initiator   User             @relation("FriendshipInitiator", fields: [initiatorId], references: [id])
//   initiatorId Int
//   recipient   User             @relation("FriendshipRecipient", fields: [recipientId], references: [id])
//   recipientId Int
//   status      FriendshipStatus @default(PENDING)

//   @@id([initiatorId, recipientId])
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { USER_NOT_SIGNED_IN } from "@/lib/response";

export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    // if user is logged in, then create the event if needed
    const userId = loggedInData.user.id;
    const responseData = await request.json();
    const { per } =
      responseData;
    const eventData = {
      eventName: eventName,
      location: location,
      startTime: startTime,
      endTime: endTime,
      maxAttendee: parseInt(maxAttendee),
      hostId: userId, // Change this to something more dynamic
    };
    
    // Check if filterIds array is not empty
    if (filterIds && filterIds.length > 0) {
      eventData.EventFilter = {
        create: filterIds.map(id => ({
          possibleFilter: {
            connect: {
              id: id,
            },
          },
        })),
      };
    }
    console.log(eventData);
    let events;
    try {
      events = await prisma.Event.create({ data: eventData });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    // simple console.log logger (need to add an actual logger in the future)
    console.log(events);
    return NextResponse.json(events);
  }
  return USER_NOT_SIGNED_IN;
}