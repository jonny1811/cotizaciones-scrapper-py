import { Document, Schema } from 'mongoose';

// export type PlaceBranchDocument = PlaceBranch & Document

export const PlaceBranchSchema = new Schema(
    {
        latitude: { type: String, required: false },
        longitude: { type: String, required: false },
        phoneNumber: { type: String, required: false },
        email: { type: String, required: false },
        imageUrl: { type: String, required: false },
        name: { type: String, required: true },
        schedule: [],
        remoteCode: { type: String, required: true },
    },
    { timestamps: true },
);
