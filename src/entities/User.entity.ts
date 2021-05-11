import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from './Form.entity';
import {FormFeedback} from "./FormFeedback.entity";
import {Notifications} from "./Notifications.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    username: string;

    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    phoneNumber: number;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    postalCode: string;

    @Column({nullable: true})
    aboutMe: string;


    @OneToMany(() => Form, form => form.user, {cascade:true})
    forms: Form[];

    @OneToMany(() => FormFeedback, formfeedback => formfeedback.user, {cascade:true})
    formfeedbacks: FormFeedback[];

    @OneToMany(() => Notifications, notification => notification.user)
    notifications: Notifications[];
}

