import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { hashSalt } from './constants';
import * as bcrypt from 'bcrypt';
import { getPayload } from '../helpers/getUserPayload';
import { SignInUserDto } from 'src/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
      throw new UnauthorizedException();
    }
    return null;
  }

  async login(user: SignInUserDto) {
    const foundedUser = await this.usersService.findOne(user.email);
    return {
      access_token: this.jwtService.sign(
        getPayload({ email: foundedUser.email, id: foundedUser.id })
      ),
    };
  }





  async signUp({email,password,...results}) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      const hash = await bcrypt.hash(password, hashSalt);
      const createdUser = await this.usersService.createUser(email, hash, results);
      return {
        access_token: this.jwtService.sign(
          getPayload({ email: createdUser.email, id: createdUser.id }),
        ),
      };
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'User already exists',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
