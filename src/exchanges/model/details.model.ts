import { Schema } from 'mongoose';

export const DetailsSchema = new Schema(
    {
        purchasePrice: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        purchaseTrend: { type: Number, required: false },
        saleTrend: { type: Number, required: false },
        isoCode: { type: String, required: true },
    },
    { timestamps: true },
);
