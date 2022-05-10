import { IsNumber, IsPositive, IsString } from "class-validator"

export class CreateExchangesDTO {
    @IsString()
    entityBank: string

    @IsString()
    name: string

    @IsNumber()
    @IsPositive()
    buyPrice: number

    @IsNumber()
    @IsPositive()
    sellPrice: number
    
    @IsNumber()
    @IsPositive()
    spread: number

    @IsString()
    date: string
}