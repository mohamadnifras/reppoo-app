import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = createAccessToken({ id: admin._id });
    const refreshToken = createRefreshToken({ id: admin._id });

    const res = NextResponse.json({ message: "Login success" });

    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return res;

}