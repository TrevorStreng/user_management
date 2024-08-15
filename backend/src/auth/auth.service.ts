import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };

    const res: LoginDto = { ...user, token: token.access_token };

    return res;
  }

  async createAccount(createUserDto: CreateUserDto): Promise<User> {
    const savedUser = this.usersService.createUser(createUserDto);
    await this.signIn(createUserDto.email, createUserDto.password);
    return savedUser;
  }
}
