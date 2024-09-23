import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET API :: get single project data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }
    const projectCollection = db.collection("projects");

    // Ensure the ID is valid before querying
    if (!ObjectId.isValid(params?.id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const singleProject = await projectCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(singleProject, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
