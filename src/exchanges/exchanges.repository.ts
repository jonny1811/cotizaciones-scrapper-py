import { Exchanges, ExchangeRepository, ExchangesDocument } from './exchanges.types';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MarketRatesParams } from './exchanges.types';
import { EXCHANGES_MODEL_NAME } from './exchanges.constants';

export class ExchangesRepository implements ExchangeRepository {

    constructor(
        @InjectModel(EXCHANGES_MODEL_NAME) private readonly exchangeModel: Model<ExchangesDocument>
    ) { }

    async findAll(): Promise<ExchangesDocument[]> {
        const exchangeList = await this.exchangeModel.find().exec()
        return exchangeList
    }

    async findById(id: string): Promise<ExchangesDocument> {
        const exchangeFind = await this.exchangeModel.findOne({ _id: id }).exec()
        return exchangeFind
    }

    async findByEntityBank(entityBank: string): Promise<ExchangesDocument[]> {
        const exchangeFilter = await this.exchangeModel.find({ entityBank }).exec()
        return exchangeFilter
    }

    async findByParams({ entityBank, date }: MarketRatesParams): Promise<ExchangesDocument[]> {
        const exchangesFind = await this.exchangeModel.find({ entityBank, date: { $regex: date } }).exec()
        return exchangesFind
    }

    async findPaginated(page: number, pageSize: number) {
        const query = () => this.exchangeModel.find()
        return await query()
            .sort({ date: -1 })
            .skip(pageSize * (page  - 1))
            .limit(pageSize)
            .exec()
    }

    async save(exchangeInfo: Exchanges): Promise<void> {
        const saveExchange = new this.exchangeModel(exchangeInfo)
        await saveExchange.save()
    }

    async update(id: string, data: Exchanges): Promise<void> {
        await this.exchangeModel
            .findOneAndUpdate({ _id: id }, { $set: data })
            .exec()
    }

    async delete(id: string): Promise<void> {
        await this.exchangeModel.deleteOne({ _id: id }).exec()
    }
}