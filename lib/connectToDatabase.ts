import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
    if (!MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined in .env file");
    }

    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Already connected to MongoDB.");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: "reelpro", // ✅ Ensure correct database is used
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("✅ Connected to MongoDB (reelpro database)");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
    }
};
