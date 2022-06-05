import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
	constructor(
		private readonly placeRepository: PlaceRepository
    ) { }

	async savePlace(placeInfo: any) {
		await this.placeRepository.save(placeInfo)
	}

	async getPlaceById(id: string) {
		return this.placeRepository.findById(id)
	}

	async getPlaceByCode(code: string) {
		return await this.placeRepository.findByCode(code)
	}
}
