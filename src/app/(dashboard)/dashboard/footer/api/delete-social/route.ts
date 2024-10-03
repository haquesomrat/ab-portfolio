import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// DELETE API:: delete social logo
export const DELETE = async (req: Request): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const { name } = body;

    // Connect to the database
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to the database." },
        { status: 500 }
      );
    }

    await db
      .collection("socials")
      .updateOne({ name }, { $set: { logo: null } });

    return NextResponse.json({
      message: `Logo for ${name} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting logo:", error);
    return NextResponse.json(
      { message: "Failed to delete logo", error },
      { status: 500 }
    );
  }
};
