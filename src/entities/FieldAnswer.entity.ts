import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {FormField} from "./FormField.entity";
import {Form} from "./Form.entity";
import {FormFeedback} from "./FormFeedback.entity";


@Entity()
export class FieldAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false , type: 'varchar'})
    answer: string | number ;

    @ManyToOne(() => FormField, formfield => formfield.fieldanswers)
    formfield: FormField;

    @ManyToOne(() => Form, form => form.fieldanswers, )
    form: Form;

    @ManyToOne(() => FormFeedback, formfeedback => formfeedback.fieldanswers)
    formfeedback: FormFeedback;

}
