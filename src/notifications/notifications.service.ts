import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Notifications} from "../entities/Notifications.entity";
import {PaginationDto} from "../dto/Pagination.dto";
import {FormFeedback} from "../entities/FormFeedback.entity";
import {PaginationResultDto} from "../dto/PaginationResult.dto";
import {Form} from "../entities/Form.entity";
import {PaginationNotifications} from "../dto/Pagination.Notifications";

@Injectable()
export class NotificationsService {
    constructor(@InjectRepository(FormFeedback)
                private formFeedbackRepo: Repository<FormFeedback>) {
    }

    async getAllNotifications(userId: number, pag: PaginationDto): Promise<PaginationNotifications> {
        let totalCount;
        const notifications = await this.formFeedbackRepo.createQueryBuilder("formfeedback")
            .leftJoinAndSelect("formfeedback.form", "form")
            .select(["form.name", "form.formCode", "formfeedback.createdAt"])
            .where({userId})
            .offset((pag.page - 1) * pag.limit || 0)
            .limit(pag.limit || 10)
            .getMany()

        totalCount = notifications.length;

        return {
            totalCount,
            page: pag.page,
            limit: pag.limit,
            data: notifications
        }
    };
}
