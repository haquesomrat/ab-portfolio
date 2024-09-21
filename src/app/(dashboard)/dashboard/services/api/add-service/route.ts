import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// POST API: Adding service
export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Parse form data
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const details = formData.get("details") as string | null;
    const logo = formData.get("logo") as File | null;

    // Validate input data
    if (!name || !details || !logo) {
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

    let logoUrl = "";

    // Handle SVG uploads
    if (logo.type === "image/svg+xml") {
      // SVGs are handled as text, so no need to upload to ImgBB
      logoUrl = await logo.text();
    } else {
      // For other image formats, convert to Base64 and upload to ImgBB
      const arrayBuffer = await logo.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString("base64");

      const imgBBResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            image: base64String,
          }),
        }
      );

      const imgBBData = await imgBBResponse.json();

      if (!imgBBData.success) {
        return NextResponse.json(
          { error: "Failed to upload logo to ImgBB." },
          { status: 500 }
        );
      }

      logoUrl = imgBBData.data.url;
    }

    // Insert the new service into the database
    const newService = { name, details, logo: logoUrl };
    const result = await db.collection("services").insertOne(newService);

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "New service added successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add the new service." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error while processing service upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
};
