import NextAuth, {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Db } from "mongodb";
import { connectDB } from "@/lib/ConnectDB";
import { DefaultJWT } from "next-auth/jwt";

// Extend the default User type
interface ExtendedUser extends DefaultUser {
  role?: string;
  image?: string | null;
}

// Extend the JWT token type
interface ExtendedToken extends DefaultJWT {
  role?: string;
  image?: string | null;
}

// Extend the session type
interface ExtendedSession extends DefaultSession {
  user: ExtendedUser;
}

interface Credentials {
  email: string;
  password: string;
}

// Extend the global namespace for TypeScript to support global `mongoClient`
declare global {
  // eslint-disable-next-line no-var
  var mongoClient: Db | null;
}

export const connectToDatabase = async (): Promise<Db> => {
  if (!globalThis.mongoClient) {
    const db = await connectDB();
    if (!db) {
      throw new Error("Failed to connect to the database");
    }
    globalThis.mongoClient = db;
  }
  return globalThis.mongoClient;
};

const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const db = await connectToDatabase();
          const user = await db
            ?.collection("users")
            .findOne({ email: credentials.email });

          if (
            !user ||
            !bcrypt.compareSync(credentials.password, user.password)
          ) {
            return null;
          }

          return { ...user, id: user._id.toString() }; // Return user with the required id field for NextAuth
        } catch (error) {
          console.error("Error authorizing credentials:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const db = await connectToDatabase();
          const userCollection = db.collection("users");
          const existingUser = await userCollection.findOne({
            email: user.email,
          });

          if (!existingUser) {
            await userCollection.insertOne({ ...user, role: "user" });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        (token as ExtendedToken).role = (user as ExtendedUser)?.role ?? "user";
        (token as ExtendedToken).image = (user as ExtendedUser)?.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // session.user.role = (token as ExtendedToken).role ?? "user";
        session.user.image = (token as ExtendedToken).image ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
