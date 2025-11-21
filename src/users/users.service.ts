import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return await this.repo.save(user);
    }

    async findOne(id: number) {
        if(!id){
            return null;
        }
        const user = await this.repo.findOneBy({ id })
        if (!user) {
           return null;
        }
        return user
    }

    async findByEmail(email: string) {
        const user = await this.repo.findOneBy({ email })
        if (!user) {
           return null
        }
        return user
    }

    async find() {
        const users = await this.repo.find({
            where: {}
        })
        return users
    }

    async update(id: number, attr: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found")
        }
        Object.assign(user, attr)
        return await this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return await this.repo.remove(user)
    }
}
