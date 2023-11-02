import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";
import { USER_NOT_SIGNED_IN } from "@/lib/response";

export async function GET(request) {
  // send in GET request as query in URL


}

// export async function POST(request) {
//   // create new equipments using prisma create

//   let equipment;
//     try {
//       equipment = await prisma.user.create({
//         data: { 
//           name: name, 
//           password: hashedPassword,
//           email: email
//         }
//       });
//     } catch (e) {
//       return NextResponse.json({error: e.message}, {status: 500 })
//     }
//     return NextResponse.json(user);
//   }
//   return USER_NOT_SIGNED_IN;
// }