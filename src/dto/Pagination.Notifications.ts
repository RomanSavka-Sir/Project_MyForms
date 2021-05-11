import {FormFeedback} from "../entities/FormFeedback.entity";

export class PaginationNotifications {
    data: [FormFeedback[], number] | FormFeedback[];
    page: number;
    limit: number;
    totalCount: number
}
