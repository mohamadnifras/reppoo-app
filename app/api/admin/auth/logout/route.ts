import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ message: "Logout success" });

    // Clear the cookies by setting maxAge to 0
    res.cookies.set("accessToken", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });

    res.cookies.set("refreshToken", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });

    return res;
}
