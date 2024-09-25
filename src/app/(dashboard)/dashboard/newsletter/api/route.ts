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
    const serviceCollection = await db
      .collection("newsletters")
      .find()
      .toArray();
    return NextResponse.json(serviceCollection);
  } catch (error) {
    console.error("Error getting all newsletters:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the newsletters" },
      { status: 500 }
    );
  }
};
