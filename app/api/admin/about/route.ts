import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";

export async function POST(req: Request) {
  await connectDB();

  const { heading, text } = await req.json();

  if (!heading || !text) {
    return NextResponse.json(
      { message: "Heading and text are required" },
      { status: 400 }
    );
  }

  const exists = await About.findOne();
  if (exists) {
    return NextResponse.json(
      { message: "About section already exists" },
      { status: 400 }
    );
  }

  const about = await About.create({ heading, text });

  return NextResponse.json(about, { status: 201 });
}

export async function GET() {
  await connectDB();
  const about = await About.findOne();
  return NextResponse.json(about);
}


export async function PATCH(req: Request) {
  await connectDB();

  const data = await req.json();

  const about = await About.findOneAndUpdate(
    {},
    data,
    { new: true }
  );

  return NextResponse.json(about);
}
