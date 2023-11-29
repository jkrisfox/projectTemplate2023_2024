import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// export async function GET(request) {
//     const seasons = await prisma.season.findMany();
//     return NextResponse.json(seasons);
// }

export async function GET(request) {
    const currentDate = new Date();

    console.log(currentDate);

    const currentSeason = await prisma.season.findFirst({
        where: {
            start: { lte: currentDate },
            end: { gte: currentDate },
        },
    });

    console.log(currentSeason);

    return NextResponse.json(currentSeason);
}