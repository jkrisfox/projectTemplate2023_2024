import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// gets the placeIds of all listings and their average scores
export async function GET(request) {
    const listings = await prisma.$queryRaw`
        SELECT "public"."Listing"."placeId", AVG("public"."Review"."score") AS "avgScore"
        FROM "public"."Review", "public"."Listing"
        WHERE "public"."Review"."listingId" = "public"."Listing"."id"
        GROUP BY "public"."Listing"."placeId"
        ORDER BY "avgScore"
    `;
    return NextResponse.json(listings);
}
