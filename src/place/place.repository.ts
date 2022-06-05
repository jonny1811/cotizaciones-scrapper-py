import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaceDocument, Places, PlacesRepository } from './place.types';
import { PLACE_MODEL_NAME } from './place.constants';

export class PlaceRepository implements PlacesRepository {
	constructor(
		@InjectModel(PLACE_MODEL_NAME) private readonly placeModel: Model<PlaceDocument>
	) {}
	
	async findAll(): Promise<Places[]> {
		const placeList = await this.placeModel.find().exec()
		return placeList
	}

	async findById(id: string): Promise<Places> {
		const placeFind = await this.placeModel.findOne({ _id: id }).exec()
		return placeFind
	}

	async findByCode(code: string): Promise<PlaceDocument[]> {
		const placeFilter = await this.placeModel.find({ code }).exec()
		return placeFilter
	}

	async save(place: Places): Promise<void> {
		const savePlace = new this.placeModel(place)
		await savePlace.save()
	}

	async update(id: string, data: Places): Promise<void> {
		await this.placeModel
			.findOneAndUpdate({ _id: id }, { $set: data })
			.exec()
	}

	async delete(id: string): Promise<void> {
		await this.placeModel.deleteOne({ _id: id })
	}
}