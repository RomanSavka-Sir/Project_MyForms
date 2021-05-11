import {BadRequestException, HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AnswersDto} from "../dto/answers.dto";
import {FormFeedback} from "../entities/FormFeedback.entity";
import {PaginationResultDto} from "../dto/PaginationResult.dto";
import {PaginationDto} from "../dto/Pagination.dto";
import {FieldAnswer} from "../entities/FieldAnswer.entity";


@Injectable()
export class AnswersService {
    constructor(@InjectRepository(FieldAnswer) private fieldanswersRepo: Repository<FieldAnswer>,
                @InjectRepository(FormFeedback) private formFeedbackRepo: Repository<FormFeedback>) {}

    async putAnswer(userId, data: AnswersDto): Promise<AnswersDto> {
        // data.createdAt = new Date(Date.now());
        //  data.userId = userId;
        const answer = await this.formFeedbackRepo.save({userId, createdAt: new Date(), ...data});

        return answer;
    };


    async deleteAnswer(userId: number, id: number): Promise<string> {
        if (id) {
            await this.formFeedbackRepo.delete(id);
            return `Answer with id: ${id} was successfully deleted`
        }
        throw new HttpException(`Answer ${id} don't exist`, 400)
    };

    async updateAnswer(userId: number, id: number, data: AnswersDto): Promise<AnswersDto> {
        const findOneAnswer =  await this.formFeedbackRepo.findOne({userId,id});
      if(findOneAnswer){
          await this.formFeedbackRepo.update(id, data);
          return this.formFeedbackRepo.findOne(id);
      };
      throw new BadRequestException('Can not delete');


    };


    async getAllAnswersForUser(userId: number, pag: PaginationDto): Promise<PaginationResultDto> {
        const skipp = 0;
        const totalCount = await this.formFeedbackRepo.count({userId});
        const formFeedbacks = await this.formFeedbackRepo.createQueryBuilder()
            .orderBy('createdAt', "DESC")
            .offset(skipp)
            .where({userId})
            .limit(pag.limit)
            .getManyAndCount()

        return {
            totalCount,
            page: pag.page,
            limit: pag.limit,
            data: formFeedbacks
        }

    };


    async getAllAnswers(pag: PaginationDto): Promise<PaginationResultDto> {
        const skipp = 0;
        const totalCount = await this.formFeedbackRepo.count();
        const formFeedbacks = await this.formFeedbackRepo.createQueryBuilder()
            .orderBy('createdAt', "DESC")
            .offset(skipp)
            .limit(pag.limit)
            .getMany();

        return {
            totalCount,
            page: pag.page,
            limit: pag.limit,
            data: formFeedbacks
        }
    };
}
