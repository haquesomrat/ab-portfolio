import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET API :: get single service data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }

    const servicesCollection = db.collection("services");

    // Ensure the ID is valid before querying
    if (!ObjectId.isValid(params?.id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    const singleService = await servicesCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(singleService, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
