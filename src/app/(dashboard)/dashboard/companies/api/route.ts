import { connectToDatabase } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// get all company data from database
export async function GET() {
  try {
    // connect to database
    const db = await connectToDatabase();

    // get the company collection form database
    const companyCollection = await db
      ?.collection("companies")
      .find()
      .toArray();

    // Ensure that the database connection exists
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(companyCollection);
  } catch (error) {
    console.error("Error getting all company:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the company" },
      { status: 500 }
    );
  }
}

// POST API: Handle file upload
export const POST = async (req: Request): Promise<NextResponse> => {
  const formData = await req.formData();
  const companyImage = formData.get("companyImage") as File | null;
  const companyName = formData.get("companyName") as String | null;

  if (!companyImage) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
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

    // connect to database
    const db = await connectToDatabase();

    if (data.success) {
      if (!db) {
        return NextResponse.json(
          { error: "Database connection failed" },
          { status: 500 }
        );
      }
      const newCompany = { companyImg: data.data.url, companyName };

      // Insert the new company into the "companies" collection
      const res = await db?.collection("companies").insertOne(newCompany);

      // Check if the insert was successful
      if (res.acknowledged) {
        return NextResponse.json({
          message: "New company added successfully",
        });
      } else {
        return NextResponse.json(
          { error: "Failed to insert company" },
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
