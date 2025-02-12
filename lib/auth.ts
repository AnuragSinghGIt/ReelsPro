import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {  // ✅ Fixed missing parameter
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                try {
                    await connectToDatabase();
                    
                    const user = await User.findOne({ email: credentials.email });  // ✅ Store result
                    if (!user) {
                        throw new Error("No user found");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password); // ✅ Store comparison result
                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email  // ✅ Fixed incorrect reference
                    };
                } catch (error) {
                    throw error;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;  // ✅ Ensure `id` is assigned
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;  // ✅ Ensure correct type
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // ✅ 30 days
    },
    secret: process.env.NEXTAUTH_SECRET
};
