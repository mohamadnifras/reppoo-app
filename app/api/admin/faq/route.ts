import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Faq from "@/models/Faq";

export async function POST(req: Request) {
  await connectDB();

  const { question, answer } = await req.json();

  if (!question || !answer) {
    return NextResponse.json(
      { message: "Question and answer are required" },
      { status: 400 }
    ); 
  }

  const faq = await Faq.create({ question, answer });
  return NextResponse.json(faq, { status: 201 });
}


export async function GET() {
  await connectDB();

  const faqs = await Faq.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}


export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();
  await Faq.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

