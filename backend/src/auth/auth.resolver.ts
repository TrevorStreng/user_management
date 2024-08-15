import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { User } from 'src/users/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginDto, {
    name: 'signIn',
  })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<any> {
    return await this.authService.signIn(email, password);
  }

  @Mutation(() => User, { name: 'createAccount' })
  async createAccount(
    @Args('createAccountInput') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.authService.createAccount(createUserDto);
  }
}
