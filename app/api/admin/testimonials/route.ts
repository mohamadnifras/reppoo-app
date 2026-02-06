import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function POST(req: Request) {
  await connectDB();

  const { name, role, message } = await req.json();

  if (!name || !role || !message) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const testimonial = await Testimonial.create({
    name,
    role,
    message,
  });

  return NextResponse.json(testimonial, { status: 201 });
}


export async function GET() {
  await connectDB();

  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}



export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

