import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { USER_NOT_SIGNED_IN } from "@/lib/response";

export async function GET(request) {
  try {
    // get all equipments
    const equipments = await prisma.Equipments.findMany();
    return NextResponse.json(equipments);
  } catch (e) {
    NextResponse.json({ error: e.message }, { status: 500 });
  }
}
