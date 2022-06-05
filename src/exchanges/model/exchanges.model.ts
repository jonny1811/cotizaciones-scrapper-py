import { Schema, Types } from 'mongoose';
import { DetailsSchema } from './details.model';

export const ExchangesSchema = new Schema(
    {
        date: { type: String },
        place: { type: Types.ObjectId, ref: 'Place' },
        branch: { type: Types.ObjectId, ref: 'PlaceBranch' },
        fullDate: { type: String },
        details: [{ type: DetailsSchema }],
    },
    { timestamps: true },
);
