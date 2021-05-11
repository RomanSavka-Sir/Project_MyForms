import {FormFeedback} from "../entities/FormFeedback.entity";

export class PaginationResultDto {
    data: [FormFeedback[], number] | FormFeedback[];
    page: number;
    limit: number;
    totalCount: number
}
