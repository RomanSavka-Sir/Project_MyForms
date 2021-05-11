import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Request, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserDto} from "../dto";
import {JwtAuthGuard} from "../auth/jwt-strategy/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "./file.config";
import {ApiBadRequestResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import { UploadPhotoConfigurations } from "./constatnts";


@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor(private UsersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({description: 'Success'})
    @ApiBadRequestResponse({description: 'Wrong id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    getUserData(@Request() req): Promise<UserDto> {
        console.log(req.user);
        return this.UsersService.getData(req.user.id);
    };


    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiOkResponse({description: 'Success'})
    @ApiBadRequestResponse({description: 'Wrong id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    updateUserData(@Request() req, @Body() data: UserDto): Promise<UserDto> {
        return this.UsersService.updateData(req.user.id, data);
    };

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @ApiOkResponse({description: 'Success'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: UploadPhotoConfigurations.ConfigDestination,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
            limits: {
                fileSize: UploadPhotoConfigurations.ConfigFileSize,
            }
        }),
    )
    uploadedFile(@UploadedFile() file): Promise<Object> {
        return this.UsersService.uploadedFile(file);
    };

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({description: 'Success'})
    @ApiBadRequestResponse({description: 'Wrong id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized.'})
    @Get(':imagepath')
    getImage(@Param('imagepath') image, @Res() res): Promise<Object> {
        return this.UsersService.getImage(image, res);
    };

}
