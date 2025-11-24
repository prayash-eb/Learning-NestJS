import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Patch,
    Session,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dtos/login-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
// this is one of the way to apply a controller-scoped interceptor to fetch the user

// this can also be done to apply a interceptor directly.
// @UseInterceptors(CurrentUserInterceptor)

// this is a way yto utlize decorator to embed interceptor
@Serialize(UserDTO)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signUpUser(body.email, body.password)
        session.userId = user.id
        return user
    }


    @Post("/signin")
    async signin(@Body() body: LoginUserDTO, @Session() session: any) {
        const user = await this.authService.sigInUser(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post("/signout")
    async signout(@Session() session: any) {
        session.userId = null
    }

    @Get("/whoami")
    @UseGuards(AuthGuard)
    async whoami(@CurrentUser() user: User) {
        return user;
    }

    @Get("/users/all")
    async findAllUsers() {
        return await this.userService.find()
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        return await this.userService.findOne(parseInt(id))
    }

    @Patch("/:id")
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.userService.update(parseInt(id), body)
    }

    @Delete("/:id")
    async removeUser(@Param('id') id: string) {
        return await this.userService.remove(parseInt(id))
    }
}
