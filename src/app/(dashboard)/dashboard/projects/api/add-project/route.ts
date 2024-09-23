// POST API:: add project to data

import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
  const formData = await req.formData();
  const preview_image = formData.get("preview_image") as File | null;
  const title = formData.get("title") as String | null;
  const description = formData.get("description") as String | null;
  const live_link = formData.get("live_link") as String | null;
  const color = formData.get("color") as String | null;

  console.log(preview_image, title, description, live_link, color);

  if (!preview_image) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const arrayBuffer = await preview_image.arrayBuffer();
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
      const newProject = {
        preview_image: data.data.url,
        title,
        description,
        color,
        live_link,
      };

      // Insert the new company into the "companies" collection
      const res = await db?.collection("projects").insertOne(newProject);

      // Check if the insert was successful
      if (res.acknowledged) {
        return NextResponse.json({
          message: "New project added successfully",
        });
      } else {
        return NextResponse.json(
          { error: "Failed to insert project" },
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
