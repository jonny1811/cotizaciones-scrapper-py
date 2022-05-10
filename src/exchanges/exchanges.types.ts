import { Document } from 'mongoose'
import { BaseRepository } from '../interfaces';

export interface Exchanges {
    entityBank: string
    name: string
    buyPrice: number
    sellPrice: number
    spread: number
    date: string
}

export interface ExchangeRepository extends BaseRepository<Exchanges> {
    findByEntityBank(entityBank: string): Promise<ExchangesDocument[] | null>
}
export type ExchangesDocument = Exchanges & Document
