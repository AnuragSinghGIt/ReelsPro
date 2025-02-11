import mongoose, { Schema, model, models } from "mongoose";

export const Video_Dimensions = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videourl: string;
    thumbnail: string;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    };
}

const transformationSchema = new Schema({
    height: { type: Number, default: Video_Dimensions.height },
    width: { type: Number, default: Video_Dimensions.width },
    quality: { type: Number, required: false },
}, { _id: false }); // ✅ Prevents Mongoose from auto-generating an `_id` field inside `transformation`

const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videourl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: { type: transformationSchema, default: {} }, // ✅ Ensures default object structure
}, { timestamps: true });

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;
