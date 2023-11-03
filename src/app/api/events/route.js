import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { USER_NOT_SIGNED_IN } from "@/lib/response";

export async function POST(request) {
  // const loggedInData = await checkLoggedIn();
  if (true) {
    // if user is logged in, then create the event if needed
    const responseData = await request.json();
    const { name, location, startTime, endTime, maxAttendee } = responseData;
    const eventData = {
      eventName: name,
      location: location,
      startTime: startTime,
      endTime: endTime,
      maxAttendee: maxAttendee,
      hostId: loggedInData.user.id,
    };
    let events;
    try {
      events = await prisma.Event.create({ data: eventData });
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    // simple console.log logger (need to add an actual logger in the future)
    console.log(events);
    return NextResponse.json(events);
  }
  return USER_NOT_SIGNED_IN;
}

export async function GET(request) {
  // send in GET request as query in URL
  // const loggedInData = await checkLoggedIn();
  if (true) {
    const { filters } = req.query;
    // if filters exist and if there is only one filter,
    // create an array of that filter
    if (filters && !Array.isArray(filters)) {
      filters = [filters];
    }
    let allEvents;
    try {
      if (filters.length > 0) {
        // Query: return all events where at least one post (some) has the filtered option ordered
        // by startTime; meaning, the earliest go first.
        allEvents = await prisma.Event.findMany({
          where: {
            EventFilter: {
              some: {
                id: {
                  in: filters,
                },
              },
            },
          },
          include: {
            filters: true,
          },
          orderBy: {
            startTime: "desc",
          },
        });
      } else {
        // if no filter, return everything
        allEvents = await prisma.Event.findMany();
      }
    } catch (e) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    console.log(allEvents); // simple logger that logs out all the events and the filters
  }
  return USER_NOT_SIGNED_IN;
}
