import {IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class FormFieldDto{

    @IsString()
    name: string;

    @IsString()
    pattern: string;

    @IsString()
    type: string;

    @IsString()
    variants: string;

    @IsString()
    placeholder: string;

    @IsString()
    formControl: string;

    @IsBoolean()
    required: boolean;
}