import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// GET API
export const GET = async () => {
  try {
    // Connect to the database
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to the database." },
        { status: 500 }
      );
    }
    const expertiseCollection = await db
      .collection("expertises")
      .find()
      .toArray();
    return NextResponse.json(expertiseCollection);
  } catch (error) {
    console.error("Error getting all expertises:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the expertises" },
      { status: 500 }
    );
  }
};
