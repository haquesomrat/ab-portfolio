import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// post single company data to database
export async function POST(request: Request) {
  try {
    // connect to database
    const db = await connectDB();
    // Parse the request body
    const newCompany = await request.json();

    console.log(newCompany);

    // Ensure that the database connection exists
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Insert the new company into the "companies" collection
    const res = await db?.collection("companies").insertOne(newCompany);

    // Check if the insert was successful
    if (res.acknowledged) {
      return NextResponse.json({
        message: "New company added successfully",
        companyId: res.insertedId,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to insert company" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error adding company:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding the company" },
      { status: 500 }
    );
  }
}
