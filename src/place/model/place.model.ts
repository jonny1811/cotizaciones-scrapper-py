import { Document, Schema } from 'mongoose';
import { EnumUtils } from '../../utils';
import { Places, PlaceType } from '../place.types';
import { PlaceBranchSchema } from './placeBranch.model';

export type PlaceDocument = Places & Document;

export const PlaceSchema = new Schema(
    {
        code: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, enum: EnumUtils.enumToArray(PlaceType), default: PlaceType.BUREAU },
        branches: [{ type: PlaceBranchSchema }],
    },
    { timestamps: true },
);
