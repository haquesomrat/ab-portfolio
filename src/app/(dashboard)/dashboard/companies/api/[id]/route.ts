import { connectDB } from "@/lib/ConnectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET API :: get single company data
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }
    const companyCollection = db.collection("companies");

    // Ensure the ID is valid before querying
    if (!ObjectId.isValid(params?.id)) {
      return NextResponse.json(
        { error: "Invalid company ID" },
        { status: 400 }
      );
    }

    const singleCompany = await companyCollection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!singleCompany) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(singleCompany, { status: 200 });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
