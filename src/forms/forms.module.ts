import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from "../entities/Form.entity";
import { User } from "../entities/User.entity";
import { FormField } from 'src/entities/FormField.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Form, User, FormField])],
  providers: [FormsService],
  controllers: [FormsController]
})
export class FormsModule {}
