import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db: Db | null = null;
let client: MongoClient | null = null;

export const connectDB = async (): Promise<Db | null> => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_MONGO_URI;

    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db("amin-babu");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return null;
  }
};
