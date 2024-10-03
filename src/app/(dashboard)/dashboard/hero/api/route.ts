import { connectDB } from "@/lib/ConnectDB";
import { NextResponse } from "next/server";

// POST API:: Add or update hero
export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    const logo = formData.get("logo") as File | null;
    const motto = formData.get("motto") as String | null;
    const headline = formData.get("headline") as String | null;
    const intro = formData.get("intro") as String | null;

    console.log(logo);

    // Validate input data
    if (!logo || !motto || !headline || !intro) {
      return NextResponse.json(
        {
          error: "Please provide all the required fields",
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
    const newHero = { headline, motto, intro, logo: logoUrl };

    const heroCollection = db.collection("hero");

    // Update the hero if it already exists (based on headline or motto), or insert a new one
    const result = await heroCollection.updateOne(
      { $or: [{ headline }, { motto }] }, // Find a hero with the same headline or motto
      { $set: newHero }, // Update the hero with new data
      { upsert: true } // If no hero is found, insert a new one
    );

    if (result.upsertedCount > 0) {
      return NextResponse.json(
        { message: "New hero added successfully." },
        { status: 201 }
      );
    } else if (result.modifiedCount > 0) {
      return NextResponse.json(
        { message: "Hero updated successfully." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No changes were made to the hero." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error while processing hero upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
};

// GET API:: get hero data
export const GET = async () => {
  try {
    // Connect to the database
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to the database." },
        { status: 500 }
      );
    }
    const heroCollection = await db.collection("hero").find().toArray();
    return NextResponse.json(heroCollection);
  } catch (error) {
    console.error("Error getting hero data:", error);
    return NextResponse.json(
      { error: "Something went wrong while getting the hero data" },
      { status: 500 }
    );
  }
};
