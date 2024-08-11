import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { LoginDto } from './login.dto';

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
}
