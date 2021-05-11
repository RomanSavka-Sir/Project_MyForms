import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { FormField } from "./FormField.entity";
import { FormFeedback } from "./FormFeedback.entity";
import {FieldAnswer} from "./FieldAnswer.entity";
import {Notifications} from "./Notifications.entity";


@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false })
    name: string;

    @Column()
    background: string;

    @Column({ nullable:false })
    formCode: string;

    @Column( { type: 'timestamp without time zone' } )
    //@CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Column( { nullable:false } )
    userId: number;

    @ManyToOne(() => User, user => user.forms)
    user: User;

    @OneToMany(() => FormField, formfield => formfield.form, { cascade: true })
    formfields: FormField[];

    @OneToMany(() => FormFeedback, formfeedback => formfeedback.form, {cascade:true})
    formfeedbacks: FormFeedback[];

    @OneToMany(() => FieldAnswer, fieldanswer => fieldanswer.form,{cascade:true})
    fieldanswers: FieldAnswer[];

    @OneToMany(() => Notifications, notification => notification.form, {cascade:true})
    notifications: Notifications[];

}
