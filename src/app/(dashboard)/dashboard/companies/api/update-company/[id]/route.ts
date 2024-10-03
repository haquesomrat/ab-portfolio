import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// PATCH API :: update single company data
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();

  if (!db) {
    throw new Error("Failed to connect to the database");
  }
  const updateDoc = await req.formData();
  const companyImage = updateDoc.get("companyImage") as File | string;
  const companyName = updateDoc.get("companyName") as String | null;

  try {
    let imageUrl: string | File = companyImage;

    // handle image file with imageBB
    if (companyImage && typeof companyImage === "object") {
      const arrayBuffer = await companyImage.arrayBuffer();
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

    // Prepare the updated company data
    const updatedCompany = {
      companyName,
      companyImg: imageUrl || null,
    };

    // Update the company in the database
    const result = await db.collection("companies").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedCompany },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Company updated successfully",
      result,
      updatedCompany,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating company:", error },
      { status: 500 }
    );
  }
};
