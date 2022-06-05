import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from '../place/model/place.model';
import { PlaceBranchSchema } from './model/placeBranch.model';
import { PLACE_MODEL_NAME, PLACE_BRANCH_MODEL_NAME } from './place.constants';
import { PlaceService } from './place.service';
import { PlaceRepository } from './place.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PLACE_MODEL_NAME,
        schema: PlaceSchema,
      },
      {
        name: PLACE_BRANCH_MODEL_NAME,
        schema: PlaceBranchSchema,
      }
    ])
  ],
  providers: [PlaceService, PlaceRepository],
  exports: [PlaceService]
})
export class PlaceModule {}
