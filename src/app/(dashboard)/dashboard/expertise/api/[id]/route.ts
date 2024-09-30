import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET API :: get single expertise data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }

    const expertiseCollection = db.collection("expertises");

    // Ensure the ID is valid before querying
    if (!ObjectId.isValid(params?.id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    const singleExpertise = await expertiseCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleExpertise) {
      return NextResponse.json(
        { error: "Expertise not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(singleExpertise, { status: 200 });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
