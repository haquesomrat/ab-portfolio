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
  const logo = updateDoc.get("logo") as File | null;
  const name = updateDoc.get("name") as String | null;
  const details = updateDoc.get("details") as String | null;

  try {
    console.log(logo);

    let logoUrl: string | null = null;

    // let imageUrl: string | null = null;

    // Handle SVG uploads
    if (logo && logo.type === "image/svg+xml") {
      // SVGs are handled as text, so no need to upload to ImgBB
      logoUrl = await logo.text();
    } else if (logo) {
      // For other image formats, convert to Base64 and upload to ImgBB
      const arrayBuffer = await logo.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString("base64");

      const imgBBResponse = await fetch(
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

      const imgBBData = await imgBBResponse.json();

      if (!imgBBData.success) {
        return NextResponse.json(
          { error: "Failed to upload logo to ImgBB." },
          { status: 500 }
        );
      }

      logoUrl = imgBBData.data.url;
    }

    // Prepare the new company data
    const newService = {
      name,
      details,
      logo: logoUrl || null,
    };

    // Update the company in the database
    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: newService },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Service updated successfully",
      result,
      newService,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating service:", error },
      { status: 500 }
    );
  }
};