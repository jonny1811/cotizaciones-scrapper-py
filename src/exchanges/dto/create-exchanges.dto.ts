import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

export class DetailsDTO {
    @IsPositive()
    @IsNumber()
    purchasePrice: number;

    @IsPositive()
    @IsNumber()
    salePrice: number;

    @IsPositive()
    @IsNumber()
    purchaseTrend: number;

    @IsPositive()
    @IsNumber()
    saleTrend: number;

    @IsString()
    isoCode: string;
}

export class CreateExchangesDTO {
    @IsString()
    date: string;

    @IsString()
    place: string;

    @IsString()
    branch: string;

    @IsString()
    fullDate: string;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DetailsDTO)
    details: DetailsDTO[] | Partial<DetailsDTO>[];
}
