import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { USER_NOT_SIGNED_IN } from "@/lib/response";
import { useSearchParams } from 'next/navigation'


export async function POST(request) {
  // const loggedInData = await checkLoggedIn();
  if (true) {
    // if user is logged in, then create the event if needed
    const responseData = await request.json();
    const { eventName, location, startTime, endTime, maxAttendee, filterIds } =
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
    // simple console.log logger (need to add an actual logger in the future)
    console.log(events);
    return NextResponse.json(events);
  }
  return USER_NOT_SIGNED_IN;
}

export async function GET(request) {
  // send in GET request as query in URL
  // const loggedInData = await checkLoggedIn();
  // const { id } = router.query;
  if (true) {
    const searchParams = request.nextUrl.searchParams;
    // Get all 'filters' query parameters as an array
    let filters = searchParams.getAll('filters');
    filters = filters.map((value) => parseInt(value))
    let allEvents;
    try {
      if (filters.length > 0) {
        // Query: return all events where at least one post (some) has the filtered option ordered
        // by startTime; meaning, the earliest go first.
        allEvents = await prisma.Event.findMany({
          where: {
            EventFilter: {
              some: {
                possibleFilterId: {
                  in: filters,
                },
              },
            },
          },
          include: {
            EventFilter: true,
          },
          orderBy: {
            startTime: "desc",
            endTime: "desc"
          },
        });
      } else {
        // if no filter, return everything
        allEvents = await prisma.Event.findMany();
      }
    } catch (e) {
      console.log(e.message)
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    console.log(JSON.stringify(allEvents, null, 2)); // simple logger that logs out all the events and the filters
    return NextResponse.json(allEvents);
  }
  return USER_NOT_SIGNED_IN;
}
