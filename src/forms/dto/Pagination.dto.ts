import { Form } from "src/entities/Form.entity"

export class PaginationDto {
    page: number
    limit: number
}

export class PaginatedFormsResultDto extends PaginationDto {
    data: Form[]
    totalCount: number
  }
