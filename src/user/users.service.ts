import {HttpStatus, Injectable, NotAcceptableException,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/User.entity';
import {Repository} from 'typeorm';
import {UserDto} from "../dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    findOne(email: string): Promise<User> {
        return this.usersRepository.findOne({where: {email}});
    }

    async createUser(
        email: string,
        password: string,
        results,
    ): Promise<User> {
        const user = this.usersRepository.create();
        user.email = email;
        user.password = password;
        Object.keys(results).forEach(key => {
            user[key] = results[key]
        })
        return this.usersRepository.save(user);
    }

    async getData(id: any): Promise<UserDto> {
        const user = await this.usersRepository.findOne({id});
        const {password, ...otherData} = user;
        return otherData;
    };

    async updateData(id: number, data: UserDto): Promise<UserDto> {
        if (data.email && await this.usersRepository.findOne({email: data.email})) {
            throw new NotAcceptableException(`User with ${data.email} is already exist`);
        }
        await this.usersRepository.update(id, data);
        return this.usersRepository.findOne({where: {id}})

    };


    async uploadedFile(file): Promise<Object> {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        const upload = await this.usersRepository.save({ avatar: file.filename } );

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            data: response,
        };

    };

    async getImage(image, res): Promise<Object> {
        const get  = await this.usersRepository.findOne({ avatar: image } );
        const response = await res.sendFile(image, {root: './uploads'});
        return {
            status: HttpStatus.OK,
            data: response,
        };
    };

}
