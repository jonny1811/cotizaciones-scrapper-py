import { Exchanges, ExchangeRepository, ExchangesDocument } from './exchanges.types';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

export class ExchangesRepository implements ExchangeRepository {

    constructor(
        @InjectModel('Exchanges') private readonly exchangeModel: Model<ExchangesDocument>
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