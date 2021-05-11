import {Controller, Get, Query, Request, UseGuards} from "@nestjs/common";
import {NotificationsService} from "./notifications.service";
import {JwtAuthGuard} from "../auth/jwt-strategy/jwt-auth.guard";
import {ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {PaginationDto} from "../dto/Pagination.dto";
import {PaginationNotifications} from "../dto/Pagination.Notifications";

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({description: 'Success'})
    @ApiBadRequestResponse({description: 'Wrong id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    getAllNotifications(@Request() req, @Query() pag: PaginationDto): Promise<PaginationNotifications> {
        return this.notificationsService.getAllNotifications(req.user.id, pag)
    };


}
