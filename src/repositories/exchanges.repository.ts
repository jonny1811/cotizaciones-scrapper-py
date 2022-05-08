import { ExchangeData } from '../interfaces/exchanges'
import { ExchangeRepository } from '../interfaces/exchanges'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

export class ExchangesRepository implements ExchangeRepository {

    constructor(
        @InjectModel('Exchanges') private readonly exchangeModel: Model<ExchangeData>
    ) { }

    async findAll(): Promise<ExchangeData[]> {
        const exchangeList = await this.exchangeModel.find().exec()
        return exchangeList
    }

    async findById(id: string): Promise<ExchangeData> {
        const exchangeFind = await this.exchangeModel.findOne({ _id: id }).exec()
        return exchangeFind
    }

    async save(data: ExchangeData): Promise<void> {
        const saveExchange = new this.exchangeModel(data)
        await saveExchange.save()
    }

    async update(id: string, data: ExchangeData): Promise<void> {
        await this.exchangeModel
            .findOneAndUpdate({ _id: id }, { $set: data })
            .exec()
    }

    async delete(id: string): Promise<void> {
        await this.exchangeModel.deleteOne({ _id: id }).exec()
    }
}