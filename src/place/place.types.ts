import { Document } from 'mongoose'
import { BaseRepository } from '../interfaces/baseRepository';

export enum PlaceType {
  BUREAU = 'BUREAU',
  BANK = 'BANK',
}

export interface Places {
  code: string;
  name: string;
  type: PlaceType;
  branches: PlaceBranch[];
}

export interface PlaceBranch {
  latitude: string;
  longitude: string;
  phoneNumber: string;
  email: string;
  imageUrl: string;
  name: string;
  schedule: string;
  remoteCode: string;
}

export interface PlacesRepository extends BaseRepository<Places> {}
export type PlaceDocument = Places & Document
export type PlaceBranchDocument = PlaceBranch & Document
