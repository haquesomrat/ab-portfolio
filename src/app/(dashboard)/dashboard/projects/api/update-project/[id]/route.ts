import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// PATCH API :: update single project data
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();

  if (!db) {
    throw new Error("Failed to connect to the database");
  }
  const updateDoc = await req.formData();
  const preview_image = updateDoc.get("preview_image") as File | null;
  const title = updateDoc.get("title") as String | null;
  const description = updateDoc.get("description") as String | null;
  const live_link = updateDoc.get("live_link") as String | null;
  const color = updateDoc.get("color") as String | null;

  console.log(preview_image, title, description, live_link, color);

  try {
    let imageUrl: string | null = null;

    if (preview_image && typeof preview_image === "object") {
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
      if (data.success) {
        imageUrl = data.data.url; // Get the uploaded image URL
      } else {
        throw new Error("Image upload failed");
      }
    } else {
      imageUrl = preview_image;
    }

    // Prepare the update project data
    const updatedProject = {
      title,
      description,
      color,
      live_link,
      preview_image: imageUrl || null,
    };

    // Update the company in the database
    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedProject },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Project updated successfully",
      result,
      updatedProject,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating project:", error },
      { status: 500 }
    );
  }
};
