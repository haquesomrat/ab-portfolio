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
  const name = updateDoc.get("name") as String | null;
  const image = updateDoc.get("image") as File | null;
  const company = updateDoc.get("company") as String | null;
  const feedback = updateDoc.get("feedback") as String | null;
  const color = updateDoc.get("color") as String | null;

  console.log(name, image, company, feedback, color);

  try {
    let imageUrl: string | null = null;

    if (image && typeof image === "object") {
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
      if (data.success) {
        imageUrl = data.data.url; // Get the uploaded image URL
      } else {
        throw new Error("Image upload failed");
      }
    }

    // Prepare the new project data
    const newFeedback = {
      name,
      company,
      color,
      feedback,
      image: imageUrl || null,
    };

    // Update the company in the database
    const result = await db.collection("feedbacks").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: newFeedback },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Feedback updated successfully",
      result,
      newFeedback,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating feedback:", error },
      { status: 500 }
    );
  }
};
