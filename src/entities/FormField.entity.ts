import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Form } from "./Form.entity";
import {FieldAnswer} from "./FieldAnswer.entity";


@Entity()
export class FormField {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({nullable: true})
    // formId?: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    pattern: string;//RegExp

    @Column({nullable: false})
    type: string;

    @Column({nullable: true})
    variants: string;

    @Column({nullable: false})
    placeholder: string;

    @Column({nullable: false})
    formControl: string;

    @Column({nullable: false})
    required: boolean;

    @ManyToOne(() => Form, form => form.formfields, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    form: Form;

    @OneToMany(() => FieldAnswer, fieldanswer => fieldanswer.formfield, {cascade:true})
    fieldanswers: FieldAnswer[]
}
