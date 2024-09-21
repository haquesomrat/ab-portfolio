import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// GET API :: get all company data from database
export async function GET() {
  try {
    // connect to database
    const db = await connectDB();

    // Ensure that the database connection exists
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // get the company collection form database
    const companyCollection = await db
      ?.collection("companies")
      .find()
      .toArray();

    return NextResponse.json(companyCollection);
  } catch (error) {
    console.error("Error getting all company:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the company" },
      { status: 500 }
    );
  }
}
