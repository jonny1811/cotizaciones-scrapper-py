import { Schema } from 'mongoose'

export const ExchangesSchema = new Schema(
    {
        entityBank: { type: String },
        name: { type: String },
        buyPrice: { type: Number },
        sellPrice: { type: Number },
        spread: { type: Number },
        date: { type: String }
    },
    {
        timestamps: true, toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (_doc, ret): void {
                delete ret._id
            }
        }
    }
)
