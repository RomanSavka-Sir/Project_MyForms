import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UsersService } from './users.service';
import {ProfileController} from "./profile.controller";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [TypeOrmModule.forFeature([User]), MulterModule.register({
    dest: "./uploads"
  })],
  providers: [UsersService],
  controllers: [ProfileController],
  exports: [TypeOrmModule]
})
export class UsersModule {}
