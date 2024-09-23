import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// GET API:: get all projects
export const GET = async () => {
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
    const projectCollection = await db?.collection("projects").find().toArray();

    return NextResponse.json(projectCollection);
  } catch (error) {
    console.error("Error getting all projects:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the company" },
      { status: 500 }
    );
  }
};
