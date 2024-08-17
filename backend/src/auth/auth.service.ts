import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(email: string, plainTextPassword: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (
      !(await this.hashingService.comparePasswords(
        plainTextPassword,
        user.password,
      ))
    ) {
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
    const plainTextPassword = createUserDto.password;
    createUserDto.password = await this.hashingService.hashPassword(
      createUserDto.password,
    );
    console.log(createUserDto.password);
    const savedUser = await this.usersService.createUser(createUserDto);
    await this.signIn(createUserDto.email, plainTextPassword);
    return savedUser;
  }
}
