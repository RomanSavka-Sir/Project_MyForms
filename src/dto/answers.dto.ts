import {FieldAnswer} from "../entities/FieldAnswer.entity";
import {IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {fieldAnswerDto} from "./fieldAnswer.dto";

export class AnswersDto {

    @IsString()
    domainURL: string;
    @ValidateNested({ each: true })
    @Type(() =>fieldAnswerDto)
    fieldanswers: fieldAnswerDto[];

    createdAt?: Date;
}
