import { IsString, IsEmail, minLength, MinLength } from "class-validator"

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}