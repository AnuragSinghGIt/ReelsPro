import mongoose, { model, Schema, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface Iuser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<Iuser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true } // ✅ Corrected 'timestamps'
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Check if model exists before defining
const User = models.User || model<Iuser>("User", userSchema);

export default User; // ✅ Fixed export statement
