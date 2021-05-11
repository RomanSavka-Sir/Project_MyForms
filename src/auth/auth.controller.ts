import { Body, Controller, Post, Get, UseGuards, Request} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Token, SignInUserDto, SignUpUserDto} from '../dto';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './jwt-strategy/jwt-auth.guard';
import { LocalAuthGuard } from './local-strategy/local.guard';
import { RolesGuard } from './roles-strategy/roles.guard';

@ApiNotFoundResponse({ description: 'Not found exception' })
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'Success',
    type: Token,
  })
  @UseGuards(LocalAuthGuard)
  // @Roles(Role.User)
  @Post('signIn')
  async signIn(@Body() req: SignInUserDto) {
    return this.authService.login(req);
  }

  @ApiOkResponse({
    description: 'Success',
    type: Token,
  })
  @Post('signUp')
  async signUp(@Body() req: SignUpUserDto) {
    return this.authService.signUp(req);
  }

}
