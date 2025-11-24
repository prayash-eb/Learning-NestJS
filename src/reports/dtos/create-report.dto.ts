import {
    IsNumber,
    IsString,
    Min,
    Max,
    IsLongitude,
    IsLatitude
} from "class-validator"

export class CreateReportDTO {

    @IsNumber()
    id: number

    @IsNumber()
    @Min(1)
    price: number

    @IsString()
    manufacturer: string

    @IsString()
    model: string

    @IsNumber()
    @Max(new Date(Date.now()).getFullYear())
    @Min(1800)
    year: number

    @IsLatitude()
    lat: number

    @IsLongitude()
    long: number

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number
}