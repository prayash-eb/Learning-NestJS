import { IsEmail, IsString, IsOptional, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    password: string
}