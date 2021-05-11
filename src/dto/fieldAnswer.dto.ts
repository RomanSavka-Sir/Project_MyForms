import {IsNumber, IsNumberString, IsString} from "class-validator";

export class fieldAnswerDto {

   @IsNumberString()
   answer: string | number ;

   @IsNumber()
   formfieldId?: number;

}