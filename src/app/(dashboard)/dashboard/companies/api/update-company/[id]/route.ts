import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// PATCH API :: update single company data
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  const updateDoc = await req.formData();
  const companyImage = updateDoc.get("companyImage") as File | null;
  const companyName = updateDoc.get("companyName") as String | null;

  console.log(typeof companyImage);

  try {
    let imageUrl: string | null = null;

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

    // Prepare the new company data
    const newCompany = {
      companyName,
      companyImg: imageUrl || null,
    };

    if (!db) {
      throw new Error("Failed to connect to the database");
    }
    // Update the company in the database
    const result = await db.collection("companies").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: newCompany },
      { upsert: false } // Ensures no new document is created if the ID doesn't exist
    );

    return NextResponse.json({
      message: "Company updated successfully",
      result,
      newCompany,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error updating company:", error },
      { status: 500 }
    );
  }
};
