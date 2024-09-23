// POST API:: add feedback to data

import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
  const formData = await req.formData();
  const name = formData.get("name") as String | null;
  const image = formData.get("image") as File | null;
  const company = formData.get("company") as String | null;
  const feedback = formData.get("feedback") as String | null;
  const color = formData.get("color") as String | null;

  console.log(name, image, company, feedback, color);

  if (!image) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const arrayBuffer = await image.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          image: base64String,
        }),
      }
    );

    const data = await response.json();

    // connect to database
    const db = await connectDB();

    if (data.success) {
      if (!db) {
        return NextResponse.json(
          { error: "Database connection failed" },
          { status: 500 }
        );
      }
      const newFeedback = {
        image: data.data.url,
        name,
        company,
        color,
        feedback,
      };

      // Insert the new company into the "companies" collection
      const res = await db?.collection("feedbacks").insertOne(newFeedback);

      // Check if the insert was successful
      if (res.acknowledged) {
        return NextResponse.json({
          message: "New feedback added successfully",
        });
      } else {
        return NextResponse.json(
          { error: "Failed to insert feedback" },
          { status: 500 }
        );
      }
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: 500 }
    );
  }
};
