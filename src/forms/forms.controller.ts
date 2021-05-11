import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/createForm.dto';
import { UpdateFormDto } from './dto/createForm.dto';
import { Form } from "../entities/Form.entity";
import { PaginatedFormsResultDto } from './dto/Pagination.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
    constructor(private formService: FormsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Success' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Wrong parameters' })
    findAll(@Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortby') sortby: 'mostRecent' | 'mostAnswered' = 'mostRecent',
        @Request() req,
        @Query('formname') formname?: string,
    ): Promise<PaginatedFormsResultDto> {
        limit = limit > 10 ? 10 : limit;
        return this.formService.getAll({ page: Number(page), limit: Number(limit) }, sortby, req.user.id, formname);
    }

    @ApiOkResponse({ description: 'Success' })
    @Get('/:name')
    findOne(@Param('name') name: string): Promise<Form> {
        return this.formService.getOne(name);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOkResponse({ description: 'Success' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    createForm(@Body() formObj: CreateFormDto, @Request() req): Promise<Form> {
        return this.formService.createForm(formObj, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOkResponse({ description: 'Success' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    updateForm(@Param('id', ParseIntPipe) objId: number, @Body() formObj: UpdateFormDto, @Request() req): Promise<Form> {
        return this.formService.updateForm(objId, formObj, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Success' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    removeForm(@Param('id', ParseIntPipe) objId: number, @Request() req): Promise<HttpStatus> {
        return this.formService.removeForm(objId, req.user.id);
    }
}
