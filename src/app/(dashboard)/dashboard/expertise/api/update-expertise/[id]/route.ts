import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// PATCH API:: update service
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    throw new Error("Failed to connect to the database");
  }

  const updateDoc = await req.formData();
  const name = updateDoc.get("name") as string | null;
  const duration = updateDoc.get("duration") as string | null;
  const delay = updateDoc.get("delay") as string | null;
  const radiusSmall = updateDoc.get("radiusSmall") as string | null;
  const radiusLarge = updateDoc.get("radiusLarge") as string | null;
  const logo = updateDoc.get("logo") as File | string;

  try {
    let logoUrl: string | null = null;

    // Handle SVG uploads
    if (logo && typeof logo === "object") {
      logoUrl = await logo.text();
    } else {
      logoUrl = logo;
    }

    // Prepare the updated expertise data
    const updatedExpertise = {
      name,
      duration,
      delay,
      radiusSmall,
      radiusLarge,
      icon: logoUrl,
    };

    // Update the company in the database
    const result = await db.collection("expertises").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedExpertise },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Expertise updated successfully",
      result,
      updatedExpertise,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating expertise:", error },
      { status: 500 }
    );
  }
};
