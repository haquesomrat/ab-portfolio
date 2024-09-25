import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// POST API: Adding newsletter
export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const subject = formData.get("subject") as File | null;
    const message = formData.get("message") as File | null;

    // Validate input data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          error:
            "Please provide all the required fields (name, details, and logo).",
        },
        { status: 400 }
      );
    }

    // Connect to the database
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to the database." },
        { status: 500 }
      );
    }

    // Insert the new service into the database
    const newNewsletter = { name, email, subject, message };
    const result = await db.collection("newsletters").insertOne(newNewsletter);

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "New newsletter added successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add the new newsletter." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error while processing newsletter upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
};
