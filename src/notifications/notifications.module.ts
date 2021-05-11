import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Notifications} from "../entities/Notifications.entity";
import {NotificationsService} from "./notifications.service";
import {NotificationsController} from "./notifications.controller";
import {FormFeedback} from "../entities/FormFeedback.entity";
import {Form} from "../entities/Form.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Form, FormFeedback])],
    providers: [NotificationsService],
    controllers: [NotificationsController]
})

export class NotificationsModule{};
