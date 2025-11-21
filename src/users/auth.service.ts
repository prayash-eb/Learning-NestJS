import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async sigInUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const [salt, storedHash] = user.password.split(".")
        const incomingPasswordHash = (await scrypt(password, salt, 32)) as Buffer
        if (incomingPasswordHash.toString("hex") !== storedHash) {
            throw new BadRequestException("Invalid Credentials")
        }
        return user
    }

    async signUpUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            throw new ConflictException("User with email already exists")
        }
        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const hashedPassword = salt + "." + hash.toString("hex")
        const newUser = await this.userService.create(email, hashedPassword)
        return newUser;
    }
}