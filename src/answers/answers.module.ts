import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FieldAnswer} from "../entities/FieldAnswer.entity";
import {AnswersController} from "./answers.controller";
import {AnswersService} from "./answers.service";
import {FormFeedback} from "../entities/FormFeedback.entity";
import {Form} from "../entities/Form.entity";


@Module({
    imports: [TypeOrmModule.forFeature([FieldAnswer, FormFeedback, Form])],
    controllers: [AnswersController],
    providers: [AnswersService]

})


export class AnswersModule {}
