import * as mongoose from 'mongoose'

export const ExchangesSchema = new mongoose.Schema(
    {
        entityBank: { type: String },
        name: { type: String },
        buyPrice: { type: Number },
        sellPrice: { type: Number },
        spread: { type: Number },
        date: { type: String }
    },
    { timestamps: true, collection: 'exchanges' }
)
