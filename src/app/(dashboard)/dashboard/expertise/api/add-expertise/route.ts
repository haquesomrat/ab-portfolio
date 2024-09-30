import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// POST API: Adding service
export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const duration = formData.get("duration") as string | null;
    const delay = formData.get("delay") as string | null;
    const radiusSmall = formData.get("radiusSmall") as string | null;
    const radiusLarge = formData.get("radiusLarge") as string | null;
    const logo = formData.get("logo") as File | null;

    // Validate input data
    if (!name || !logo || !duration || !delay || !radiusSmall || !radiusLarge) {
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

    // Handle SVG uploads
    const logoUrl = await logo.text();

    // Insert the new service into the database
    const newExpertise = {
      name,
      duration,
      delay,
      radiusSmall,
      radiusLarge,
      icon: logoUrl,
    };
    const result = await db.collection("expertises").insertOne(newExpertise);

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "New expertise added successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add the new expertise." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error while processing expertise upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
};
