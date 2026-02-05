import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Hero from "@/models/Hero";

export async function POST(req: Request) {
  await connectDB();


  const formData = await req.formData();

  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const file = formData.get("image") as File;

  if (!title || !subtitle || !file) {
    return NextResponse.json(
      { message: "Title, subtitle, and image are required" },
      { status: 400 }
    );
  }

  //Upload image to Cloudinary
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "reppoo" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  //Prevent multiple hero documents
  const existingHero = await Hero.findOne();
  if (existingHero) {
    return NextResponse.json(
      { message: "Hero already exists. Use PATCH." },
      { status: 400 }
    );
  }

  //Save hero to database
  const hero = await Hero.create({
    title,
    subtitle,
    image: uploadResult.secure_url,
  });

  return NextResponse.json(hero, { status: 201 });
}


export async function GET() {
  await connectDB();
  const hero = await Hero.findOne();
  return NextResponse.json(hero);
}


export async function PATCH(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const data: any = {};

  const title = formData.get("title");
  const subtitle = formData.get("subtitle");
  const file = formData.get("image") as File | null;

  if (title) data.title = title;
  if (subtitle) data.subtitle = subtitle;

  // Upload new image only if provided
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "reppoo" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    data.image = uploadResult.secure_url;
  }

  const hero = await Hero.findOneAndUpdate({}, data, { new: true });
  return NextResponse.json(hero);
}
