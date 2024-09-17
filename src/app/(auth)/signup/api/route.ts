import { connectToDatabase } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/ConnectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface NewUser {
  name: string;
  email: string;
  password: string;
  img: string;
  role: string;
}

export const POST = async (request: Request) => {
  try {
    // Parse the incoming request body as NewUser type
    const newUser: NewUser = await request.json();

    console.log(newUser);
    // Connect to the database
    const db = await connectToDatabase();
    if (!db) {
      console.error("Database connection failed.");
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const userCollection = db.collection("users");

    // Check if the user already exists
    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);

    // Insert the new user into the database
    await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    // Return success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Return error response
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
};
