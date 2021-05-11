import {Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards} from "@nestjs/common";
import {AnswersService} from "./answers.service";
import {AnswersDto} from "../dto/answers.dto";
import {PaginationDto} from "../dto/Pagination.dto";
import {PaginationResultDto} from "../dto/PaginationResult.dto";
import {ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-strategy/jwt-auth.guard";


@ApiTags('answers')
@Controller('answers')
export  class AnswersController{
    constructor(private answersService: AnswersService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOkResponse({ description: 'Success' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
     putAnswer(@Request() req, @Body() data:AnswersDto): Promise<AnswersDto> {
         return this.answersService.putAnswer(req.user.id, data);
    };

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    deleteAnswer(@Request() req, @Param('id') id: number): Promise<string> {
        return this.answersService.deleteAnswer(req.user.id, id);
    };

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    updateAnswer(@Request() req, @Param('id') id: number, @Body() data:AnswersDto): Promise<AnswersDto> {
        return this.answersService.updateAnswer(req.user.id, id, data);
    };

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    getAllAnswersForUser(@Request() req, @Query() pag: PaginationDto): Promise<PaginationResultDto> {
        pag.page = Number(pag.page);
        pag.limit = Number(pag.limit);
        return this.answersService.getAllAnswersForUser(req.user.id, {
            ...pag,
            limit: pag.limit > 10 ? 10 : pag.limit
        });
    }


    @UseGuards(JwtAuthGuard)
    @Get('users')
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Wrong id' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
        getAllAnswers(@Query() pag: PaginationDto): Promise<PaginationResultDto> {
            pag.page = Number(pag.page);
            pag.limit = Number(pag.limit);
            return this.answersService.getAllAnswers({
                ...pag,
                limit: pag.limit > 10 ? 10: pag.limit
            });

    };
}

