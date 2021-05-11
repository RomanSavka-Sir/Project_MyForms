import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User.entity";
import {FormFeedback} from "./FormFeedback.entity";
import {Form} from "./Form.entity";

@Entity()
export class Notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false })
    userId: number;

    @Column({ nullable:false })
    formId: number;

    @Column({ nullable:false })
    formfeedbackId: number;


   @ManyToOne(() => User, user => user.notifications)
    user: User;

   @ManyToOne(() => FormFeedback, formfeedback => formfeedback.notifications)
    formfeedback: FormFeedback;

   @ManyToOne(() => Form, form => form.notifications)
    form: Form;
}
