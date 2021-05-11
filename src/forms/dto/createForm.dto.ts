import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FormField } from 'src/entities/FormField.entity';
import { Type } from 'class-transformer';
import { FormFieldDto } from './formField.dto';

export class CreateFormDto {

    @IsString()
    name: string;

    @IsString()
    background: string;

    @IsString()
    formCode: string;

    createdAt?:Date;

    @ValidateNested({ each: true })
    @Type(() => FormFieldDto)
    formfields: FormFieldDto[];
}

export class UpdateFormDto {

    @IsNumber()
    id:number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    background: string;

    @IsString()
    @IsOptional()
    formCode: string;

    @IsOptional()
    createdAt:Date;

    @ValidateNested({ each: true })
    @Type(() => FormFieldDto)
    @IsOptional()
    formfields: FormFieldDto[];
}
