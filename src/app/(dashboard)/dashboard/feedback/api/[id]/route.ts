import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET API :: get single feedback data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }
    const feedbackCollection = db.collection("feedbacks");

    // Ensure the ID is valid before querying
    if (!ObjectId.isValid(params?.id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const singleFeedback = await feedbackCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleFeedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(singleFeedback, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
