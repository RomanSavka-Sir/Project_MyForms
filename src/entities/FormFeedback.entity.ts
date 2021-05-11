import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Form } from "./Form.entity";
import {FieldAnswer} from "./FieldAnswer.entity";
import {User} from "./User.entity";
import {Notifications} from "./Notifications.entity";


@Entity()
export class FormFeedback {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false })
    domainURL: string;

    @Column( { type: 'timestamp without time zone' } )
    createdAt: Date;

    @Column( { nullable:false } )
    userId: number;

    @ManyToOne(() => Form, form => form.formfeedbacks)
    form: Form;

    @OneToMany(() => FieldAnswer, fieldanswer => fieldanswer.formfeedback, {cascade:true})
    fieldanswers: FieldAnswer[];

    @ManyToOne(() => User, user => user.formfeedbacks)
    user: User;

    @OneToMany(() => Notifications, notification => notification.formfeedback, { cascade: true })
    notifications: Notifications[];
}
