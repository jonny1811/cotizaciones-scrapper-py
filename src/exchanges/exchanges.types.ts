import { Document } from 'mongoose'
import { BaseRepository } from '../interfaces';

export interface Exchanges {
	date: string
	place: string
	branch: string
	fullDate: string
	details: Details[] | Partial<Details>[],
}

export interface Details {
	purchasePrice: number
	salePrice: number
	purchaseTrend: number
	saleTrend: number
	isoCode: string
}

export interface MarketRatesParams {
    entityBank: string
    date: string
}

export interface ExchangeRepository extends BaseRepository<Exchanges> {
    findByEntityBank(entityBank: string): Promise<ExchangesDocument[] | null>
}
export type ExchangesDocument = Exchanges & Document
