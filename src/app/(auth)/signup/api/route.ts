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
    const db = await connectDB();
    if (!db) {
      console.error("Database connection failed.");
      return null;
    }

    const userCollection = db.collection("users");

    // Check if the user already exists
    const exist = await userCollection.findOne({ email: newUser.email });
    if (exist) {
      return new NextResponse(
        JSON.stringify({ message: "User Already Exists" }),
        {
          status: 304,
        }
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
    return new NextResponse(
      JSON.stringify({ message: "User created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Return error response
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
};
