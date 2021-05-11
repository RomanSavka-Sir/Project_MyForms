import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFormDto } from './dto/createForm.dto';
import { UpdateFormDto } from './dto/createForm.dto';
import { PaginatedFormsResultDto, PaginationDto } from './dto/Pagination.dto';
import { FormField } from 'src/entities/FormField.entity';
import { Repository } from 'typeorm';
import { Form } from "../entities/Form.entity";

@Injectable()
export class FormsService {
    constructor(@InjectRepository(Form) private readonly formRepo: Repository<Form>,
        @InjectRepository(FormField) private readonly fieldsRepo: Repository<FormField>
    ) { }

    async createForm(data: CreateFormDto, userId: number): Promise<Form> {
        data.createdAt = new Date(Date.now());
        const saved = await this.formRepo.save({ ...data, userId });

        return saved;

    }

    async updateForm(id: number, data: UpdateFormDto, userIdt: number): Promise<Form> {
        const form = await this.formRepo.findOne({ where: { userId: userIdt, id } });
        data.createdAt = new Date(Date.now());

        if (!form) {
            throw new NotFoundException('Form not found');
        }

        const { formfields, ...formData } = data;
        await this.formRepo.update(id, formData);
        await this.fieldsRepo.save(formfields);

        return this.formRepo.findOne(id);
    }

    async removeForm(id: number, userIdt: number): Promise<HttpStatus> {
        const form = await this.formRepo.findOne({ where: { userId: userIdt, id } });
        if (!form) {
            throw new NotFoundException('Form not found');
        }
        await this.formRepo.delete(id);

        return HttpStatus.OK;
    }

    async getOne (name:string): Promise <Form>{
        const form = await this.formRepo.createQueryBuilder("form")
        .leftJoinAndSelect("form.formfields", "fd","form.id = fd.formId")
        .groupBy("form.id")
        .addGroupBy("fd.id")
        .where("form.formCode like :formCode", { formCode: `%${name}%` })
        .getOne()

        if (form) {
            return form;
        }
        else{
            throw new NotFoundException('Form not found');
        }
    }

    async getAll(options: PaginationDto, sortBy: 'mostRecent' | 'mostAnswered' = 'mostRecent',
     uId: number,formName?: string): Promise<PaginatedFormsResultDto> {
        //const totalCount = await this.formRepo.count();
        const sortpropname = sortBy === "mostRecent" ? "data" : "count";
        let totalCount;
        const forms = await this.formRepo.createQueryBuilder("form")
        // .select("form.id")
        .leftJoin("form.formfeedbacks", "ff")
        .leftJoinAndSelect("form.formfields", "fd","form.id = fd.formId")
        .addSelect("form.createdAt AS data")
        .addSelect("COUNT(ff.formId) as count")
        //.addSelect("ff.name")
        .groupBy("form.id")
        .addGroupBy("fd.id")
        .orderBy(sortpropname, "DESC")
        .where("form.name like :name", { name: `%${formName}%` })
        .andWhere("form.userId = :id", { id: uId })
        .offset((options.page - 1) * options.limit || 0)
        .limit(options.limit || 10)
        .printSql()
        .getMany()
        //.getRawMany();

        const allForms = await this.formRepo.createQueryBuilder("form")
        // .select("form.id")
        .leftJoin("form.formfeedbacks", "ff")
        .leftJoinAndSelect("form.formfields", "fd","form.id = fd.formId")
        .addSelect("form.createdAt AS data")
        .addSelect("COUNT(ff.formId) AS count")
        .groupBy("form.id")
        //.addGroupBy("ff.id")
        .addGroupBy("fd.id")
        .orderBy(sortpropname, "DESC")
        .where("form.userId = :id", { id: uId })
        .offset((options.page - 1) * options.limit || 0)
        .limit(options.limit || 10)
        .printSql()
        .getMany()
        //.getRawMany();

        if (formName){
            totalCount = forms.length;
            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                data:forms
            }
        }
        else{
            totalCount = allForms.length;
            return {
                totalCount,
                page: options.page,
                limit: options.limit,
                data:allForms
            }
        }
    }
}
