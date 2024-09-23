import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// DELETE API:: delete single feedback
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB(); // Ensure the database connection is awaited
  if (!db) {
    throw new Error("Failed to connect to the database");
  }

  try {
    // Ensure the id is a valid ObjectId
    const objectId = new ObjectId(params?.id);

    // Delete the document with the matching _id
    const res = await db.collection("feedbacks").deleteOne({ _id: objectId });

    if (res.deletedCount === 0) {
      // If no document was deleted, return an error message
      return NextResponse.json(
        { message: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Feedback deleted successfully", res });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { message: "Failed to delete feedback", error },
      { status: 500 }
    );
  }
};
