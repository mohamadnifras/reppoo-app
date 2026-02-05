// import { NextResponse } from "next/server";
// import { verifyRefreshToken, createAccessToken } from "@/lib/jwt";

// export async function POST(req: Request) {
//   const refreshToken = req.headers
//     .get("cookie")
//     ?.split("refreshToken=")[1];

//   if (!refreshToken) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const payload: any = verifyRefreshToken(refreshToken);
//     const newAccessToken = createAccessToken({ id: payload.id });

//     const res = NextResponse.json({ message: "Token refreshed" });
//     res.cookies.set("accessToken", newAccessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       maxAge: 60 * 15,
//     });

//     return res;
//   } catch {
//     return NextResponse.json({ message: "Invalid token" }, { status: 403 });
//   }
// }


import { NextResponse } from "next/server";
import { verifyRefreshToken, createAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const payload: any = verifyRefreshToken(refreshToken);

    const newAccessToken = createAccessToken({ id: payload.id });

    const res = NextResponse.json({ message: "Token refreshed" });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
