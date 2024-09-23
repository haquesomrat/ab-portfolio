import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// GET API:: get all feedbacks
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
    const feedbackCollection = await db
      ?.collection("feedbacks")
      .find()
      .toArray();

    return NextResponse.json(feedbackCollection);
  } catch (error) {
    console.error("Error getting all feedbacks:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the feedbacks" },
      { status: 500 }
    );
  }
};
